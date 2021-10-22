/* eslint-disable import/no-cycle */
import { Validator } from 'incognito-chain-web-js/build/wallet';
import LocalDatabase from '@utils/LocalDatabase';
import types from '@src/redux/types/masterKey';
import MasterKeyModel from '@models/masterKey';
import storage from '@src/services/storage';
import {
  importWallet,
  saveWallet,
  storeWalletAccountIdsOnAPI,
  configsWallet,
} from '@services/wallet/WalletService';
import {
  actionSubmitOTAKeyForListAccount,
  reloadWallet,
} from '@src/redux/actions/wallet';
import { getWalletAccounts } from '@services/api/masterKey';
import {
  currentMasterKeySelector,
  masterKeysSelector,
  masterlessKeyChainSelector,
  noMasterLessSelector,
} from '@src/redux/selectors/masterKey';
import _ from 'lodash';
import { clearWalletCaches } from '@services/cache';
import uniqBy from 'lodash/uniqBy';
import { accountServices } from '@src/services/wallet';
import { batch } from 'react-redux';
import { ExHandler } from '@src/services/exception';

const DEFAULT_MASTER_KEY = new MasterKeyModel({
  name: 'Wallet',
  isActive: true,
});

const MASTERLESS = new MasterKeyModel({
  name: 'Masterless',
  isActive: false,
});

const updateNetwork = async () => {
  const serverJSONString = await storage.getItem('$servers');
  const servers = JSON.parse(serverJSONString || '[]');
  const currentServer = servers.find((item) => item.default) || {
    id: 'mainnet',
  };
  const isMainnet = currentServer.id === 'mainnet';
  MasterKeyModel.network = isMainnet
    ? 'mainnet'
    : currentServer?.id || 'testnet';
};

const migrateData = async () => {
  let isMigratedData = false;
  const data = await storage.getItem('Wallet');

  if (data) {
    await storage.setItem(`$${MasterKeyModel.network}-master-masterless`, data);
    // await storage.removeItem('Wallet');
    isMigratedData = true;
  }

  const dexHistories = await LocalDatabase.getOldDexHistory();
  if (dexHistories.length > 0) {
    await storage.setItem(
      `$${MasterKeyModel.network}-master-masterless-dex-histories`,
      JSON.stringify(dexHistories),
    );
    isMigratedData = true;
  }

  return isMigratedData;
};

const initMasterKeySuccess = (data) => ({
  type: types.INIT,
  payload: data,
});

export const initMasterKey = (masterKeyName, mnemonic) => async (dispatch) => {
  console.time('TOTAL_TIME_INIT_MASTER_KEY');
  try {
    await updateNetwork();
    const isMigrated = await migrateData();
    const defaultMasterKey = new MasterKeyModel(DEFAULT_MASTER_KEY);
    const masterlessMasterKey = new MasterKeyModel(MASTERLESS);
    const masterlessWallet = await masterlessMasterKey.loadWallet();
    if (!isMigrated) {
      masterlessWallet.MasterAccount.child = [];
    }
    defaultMasterKey.name = masterKeyName;
    let wallet = await importWallet(
      mnemonic,
      defaultMasterKey.getStorageName(),
    );
    defaultMasterKey.mnemonic = wallet.Mnemonic;
    defaultMasterKey.wallet = wallet;
    wallet.RootName = masterKeyName;
    const masterKeys = [defaultMasterKey, masterlessMasterKey];
    await saveWallet(wallet);
    await saveWallet(masterlessWallet);
    batch(async () => {
      await dispatch(initMasterKeySuccess(masterKeys));
      await dispatch(switchMasterKeySuccess(defaultMasterKey.name));
      dispatch(reloadWallet());
      storeWalletAccountIdsOnAPI(wallet);
      dispatch(actionSubmitOTAKeyForListAccount(wallet));
    });
  } catch (error) {
    throw error;
  }
  console.timeEnd('TOTAL_TIME_INIT_MASTER_KEY');
};

const loadAllMasterKeysSuccess = (data) => ({
  type: types.LOAD_ALL,
  payload: data,
});

export const loadAllMasterKeys = () => async (dispatch) => {
  try {
    await updateNetwork();
    let masterKeyList = _.uniqBy(
      await LocalDatabase.getMasterKeyList(),
      (item) => item.name,
    ).map((item) => new MasterKeyModel(item));
    for (let masterKey of masterKeyList) {
      try {
        await masterKey.loadWallet();
      } catch (error) {
        console.log('LOAD WALLET ERROR', masterKey?.name);
      }
    }
    await dispatch(loadAllMasterKeysSuccess(masterKeyList));
  } catch (error) {
    console.log('loadAllMasterKeys error', error);
    throw error;
  }
};

const switchMasterKeySuccess = (data) => ({
  type: types.SWITCH,
  payload: data,
});

export const switchhingMasterKey = (payload) => ({
  type: types.SWITCHING,
  payload,
});

export const switchMasterKey = (masterKeyName, accountName) => async (
  dispatch,
) => {
  try {
    new Validator('switchMasterKey-masterKeyName', masterKeyName)
      .required()
      .string();
    new Validator('switchMasterKey-accountName', accountName).string();
    clearWalletCaches();
    dispatch(switchhingMasterKey(true));
    dispatch(switchMasterKeySuccess(masterKeyName));
    dispatch(reloadWallet(accountName));
  } catch (error) {
    throw error;
  } finally {
    dispatch(switchhingMasterKey(false));
  }
};

const createMasterKeySuccess = (newMasterKey) => ({
  type: types.CREATE,
  payload: newMasterKey,
});

export const createMasterKey = (data) => async (dispatch) => {
  let newMasterKey, wallet;
  try {
    newMasterKey = new MasterKeyModel({
      ...data,
    });
    wallet = await importWallet(data.mnemonic, newMasterKey.getStorageName());
    newMasterKey.wallet = wallet;
    newMasterKey.mnemonic = wallet.Mnemonic;
    wallet.RootName = newMasterKey.name;
    await saveWallet(wallet);
    batch(async () => {
      await dispatch(createMasterKeySuccess(newMasterKey));
      await dispatch(switchMasterKeySuccess(data.name));
      dispatch(reloadWallet());
      dispatch(actionSubmitOTAKeyForListAccount(wallet));
      storeWalletAccountIdsOnAPI(wallet);
    });
  } catch (error) {
    throw error;
  }
};

const importMasterKeySuccess = (newMasterKey) => ({
  type: types.IMPORT,
  payload: newMasterKey,
});

export const syncServerAccounts = async (wallet) => {
  try {
    const masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
    const accounts = await getWalletAccounts(
      masterAccountInfo.PublicKeyCheckEncode,
    );
    if (accounts.length > 0) {
      wallet.MasterAccount.child = [];
      for (const account of accounts) {
        try {
          await wallet.importAccountWithId(account.id, account.name);
        } catch (error) {
          console.log('IMPORT ACCOUNT WITH ID FAILED', error);
        }
      }
    }
  } catch (error) {
    console.log('syncServerAccounts error', error);
  }
};

const syncUnlinkWithNewMasterKey = (newMasterKey) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const masterless = masterlessKeyChainSelector(state);
  const accounts = await masterless.getAccounts();
  const masterLessWallet = masterless.wallet;
  const wallet = newMasterKey.wallet;
  for (const account of accounts) {
    const findItemWithKey = (item) =>
      item.getPrivateKey() === account.PrivateKey;
    const isCreated = await wallet.hasCreatedAccount(account.PrivateKey);
    if (isCreated) {
      const masterAccountIndex = wallet.MasterAccount.child.findIndex(
        findItemWithKey,
      );
      const masterlessAccount = masterLessWallet.MasterAccount.child.find(
        findItemWithKey,
      );

      masterLessWallet.MasterAccount.child = masterLessWallet.MasterAccount.child.filter(
        (item) => !findItemWithKey(item),
      );
      if (masterAccountIndex > -1) {
        const masterAccount = wallet.MasterAccount.child[masterAccountIndex];
        masterlessAccount.name = masterAccount.name;
        wallet.MasterAccount.child[masterAccountIndex] = masterlessAccount;
      } else {
        wallet.MasterAccount.child.push(masterlessAccount);
      }
      // Found duplicate account name
      if (wallet.MasterAccount.child.filter(findItemWithKey).length > 1) {
        const isDuplicatedNameAccount = wallet.MasterAccount.child.find(
          findItemWithKey,
        );
        if (isDuplicatedNameAccount) {
          let index = 1;
          let newName = isDuplicatedNameAccount.name + index;
          while (
            wallet.MasterAccount.child.find((item) => item.name === newName)
          ) {
            index++;
            newName = isDuplicatedNameAccount.name + index;
          }
          isDuplicatedNameAccount.name = newName;
        }
      }
    }
  }
  await saveWallet(masterLessWallet);
  await dispatch(updateMasterKey(masterless));
};

export const importMasterKey = (data) => async (dispatch) => {
  console.time('TOTAL_TIME_IMPORT_MASTER_KEY');
  try {
    const newMasterKey = new MasterKeyModel({
      ...data,
    });
    let wallet = await importWallet(
      data.mnemonic,
      newMasterKey.getStorageName(),
    );
    await syncServerAccounts(wallet);
    newMasterKey.wallet = wallet;
    newMasterKey.mnemonic = wallet.Mnemonic;
    wallet.RootName = newMasterKey.name;
    await saveWallet(wallet);
    batch(async () => {
      await dispatch(importMasterKeySuccess(newMasterKey));
      await dispatch(switchMasterKeySuccess(data.name));
      dispatch(reloadWallet());
      dispatch(actionSubmitOTAKeyForListAccount(wallet));
      dispatch(syncUnlinkWithNewMasterKey(newMasterKey));
    });
  } catch (error) {
    throw error;
  }
  console.timeEnd('TOTAL_TIME_IMPORT_MASTER_KEY');
};

const updateMasterKeySuccess = (masterKey) => ({
  type: types.UPDATE,
  payload: masterKey,
});

export const updateMasterKey = (masterKey) => async (dispatch) => {
  dispatch(updateMasterKeySuccess(masterKey));
};

const removeMasterKeySuccess = (history) => ({
  type: types.REMOVE,
  payload: history,
});

export const removeMasterKey = (name) => async (dispatch, getState) => {
  const state = getState();
  const list = masterKeysSelector(state);
  const newList = _.remove([...list], (item) => item.name !== name);
  const activeItem = newList.find((item) => item.isActive);
  if (!activeItem) {
    const firstItem = newList.filter(
      (item) => item.name.toLowerCase() !== 'masterless',
    )[0];
    await dispatch(switchMasterKey(firstItem.name));
  }
  await dispatch(removeMasterKeySuccess(name));
};

const loadAllMasterKeyAccountsSuccess = (accounts) => ({
  type: types.LOAD_ALL_ACCOUNTS,
  payload: accounts,
});

export const actionLoadingAllMasterKeyAccount = (payload) => ({
  type: types.LOADING_ALL_ACCOUNTS,
  payload,
});

export const loadAllMasterKeyAccounts = () => async (dispatch, getState) => {
  await dispatch(actionLoadingAllMasterKeyAccount(true));
  try {
    const state = getState();
    const masterKeys = [
      ...noMasterLessSelector(state),
      masterlessKeyChainSelector(state),
    ];
    let accounts = [];
    for (const masterKey of masterKeys) {
      try {
        await dispatch(actionSyncAccountMasterKey(masterKey));
        const masterKeyAccounts = await masterKey.getAccounts(true);
        accounts = [...accounts, ...masterKeyAccounts];
      } catch (error) {
        console.log('ERROR LOAD ACCOUNTS OF MASTER KEYS', error);
      }
    }
    await dispatch(loadAllMasterKeyAccountsSuccess(accounts));
  } catch (error) {
    new ExHandler(error).showErrorToast();
  }
  await dispatch(actionLoadingAllMasterKeyAccount(false));
};

export const actionLoadInitial = () => async (dispatch, getState) => {
  let list = [];
  try {
    list = uniqBy(await LocalDatabase.getMasterKeyList(), (item) => item.name);
  } catch (error) {
    console.log('error-actionLoadInitial', error);
  } finally {
    dispatch({
      type: types.LOADING_INITIAL,
      payload: {
        loading: false,
        masterKeyList: list,
      },
    });
  }
};

export const actionSyncAccountMasterKey = (defaultMasterKey) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    let masterKey: MasterKeyModel =
      defaultMasterKey || currentMasterKeySelector(state);
    if (masterKey.isMasterless) {
      return;
    }
    let wallet = masterKey.wallet;
    await configsWallet(wallet);
    let masterAccountInfo = await wallet.MasterAccount.getDeserializeInformation();
    const serverAccounts = await getWalletAccounts(
      masterAccountInfo.PublicKeyCheckEncode,
      dispatch,
    );
    const accountIds = [];
    for (const account of wallet.MasterAccount.child) {
      const accountInfo = await account.getDeserializeInformation();
      accountIds.push(accountInfo.ID);
    }
    const newAccounts = serverAccounts.filter(
      (item) =>
        !accountIds.includes(item.id) &&
        !(masterKey.deletedAccountIds || []).includes(item.id),
    );
    if (newAccounts.length > 0) {
      let accounts = [];
      for (const account of newAccounts) {
        try {
          const newAccount = await wallet.importAccountWithId(
            account.id,
            account.name,
          );
          if (account?.name) {
            accounts.push(newAccount);
          }
        } catch (error) {
          console.log('IMPORT ACCOUNT WITH ID FAILED', error);
        }
      }
      await wallet.save();
    }
  } catch (error) {
    throw error;
  }
};

export const actionLoadDefaultWallet = () => async (dispatch, getState) => {
  console.time('TOTAL_TIME_LOAD_DEFAULT_WALLET');
  try {
    console.time('LOAD_ALL_MASTER_KEYS');
    await dispatch(loadAllMasterKeys());
    console.timeEnd('LOAD_ALL_MASTER_KEYS');
    console.time('RELOAD_WALLET');
    const defaultAccountName = await accountServices.getDefaultAccountName();
    await dispatch(reloadWallet(defaultAccountName));
    console.timeEnd('RELOAD_WALLET');
  } catch (error) {
    throw error;
  }
  console.timeEnd('TOTAL_TIME_LOAD_DEFAULT_WALLET');
};
