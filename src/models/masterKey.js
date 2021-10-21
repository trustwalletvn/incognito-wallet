import { Wallet } from 'incognito-chain-web-js/build/wallet';
import { initWallet, loadWallet } from '@services/wallet/WalletService';
import storage from '@services/storage';
import { getPassphrase } from '@services/wallet/passwordService';
import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';

class MasterKeyModel {
  static network = 'mainnet';

  constructor(data = {}) {
    this.name = data?.name;
    this.mnemonic = data?.passphrase;
    this.isActive = !!data?.isActive;
    this.deletedAccountIds = data?.deletedAccountIds || [];
    this.isMasterless =
      isEqual(toLower(this?.name), 'masterless') ||
      isEqual(toLower(this?.name), 'unlinked');
  }

  static getStorageName(name) {
    return `$${MasterKeyModel.network}-master-${name.toLowerCase()}`;
  }

  getStorageName() {
    return MasterKeyModel.getStorageName(this.name);
  }

  /**
   * Load wallet from storage
   * @returns {Promise<Wallet>}
   */
  async loadWallet() {
    const rootName = this.name;
    const storageName = this.getStorageName();
    const rawData = await storage.getItem(storageName);
    console.time('GET_PASSPHRASE');
    const passphrase = await getPassphrase();
    console.timeEnd('GET_PASSPHRASE');
    console.log('passphrase', passphrase);
    let wallet;
    if (rawData) {
      console.time('TIME_LOAD_WALLET_FROM_STORAGE');
      wallet = await loadWallet(passphrase, storageName, rootName);
      console.timeEnd('TIME_LOAD_WALLET_FROM_STORAGE');
    }
    if (!wallet) {
      console.time('TIME_INIT_WALLET');
      wallet = await initWallet(storageName, rootName);
      console.timeEnd('TIME_INIT_WALLET');
    }
    this.mnemonic = wallet.Mnemonic;
    this.wallet = wallet;
    wallet.deletedAccountIds = this.deletedAccountIds || [];
    if (toLower(this.name) === 'unlinked') {
      this.name = 'Masterless';
      wallet.Name = this.getStorageName();
      await wallet.save();
    }
    wallet.Name = this.getStorageName();
    return wallet;
  }

  get noOfKeychains() {
    return this.wallet?.MasterAccount?.child.length || 0;
  }

  async getAccounts(deserialize = true) {
    if (!deserialize) {
      return this.wallet.MasterAccount.child;
    }

    const accountInfos = [];

    for (const account of this.wallet.MasterAccount.child) {
      const accountInfo = await account.getDeserializeInformation();
      accountInfo.Wallet = this.wallet;
      accountInfo.MasterKey = this;
      accountInfo.FullName = `${this.name}-${accountInfo.AccountName}`;
      accountInfos.push(accountInfo);
      accountInfo.MasterKeyName = this.name;
    }

    return accountInfos;
  }
}

export default MasterKeyModel;
