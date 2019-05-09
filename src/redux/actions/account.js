import type from '@src/redux/types/account';
import accountService from '@src/services/wallet/accountService';

export const setAccount = (account = throw new Error('Account object is required')) => ({
  type: type.SET,
  data: account
});

export const setBulkAccount = (accounts = throw new Error('Account array is required')) => {
  if (accounts && accounts.constructor !== Array) {
    throw new TypeError('Accounts must be an array');
  }

  return ({
    type: type.SET_BULK,
    data: accounts
  });
};

export const removeAllAccount = () => ({
  type: type.REMOVE_ALL,
});

export const removeAccountByName = (accountName = throw new Error('Account name is required')) => ({
  type: type.REMOVE_BY_NAME,
  data: accountName
});

export const getBalanceStart = accountName => ({
  type: type.GET_BALANCE,
  data: accountName
});

export const getBalanceFinish = accountName => ({
  type: type.GET_BALANCE_FINISH,
  data: accountName
});

export const getBalance = (account = throw new Error('Account object is required')) => async (dispatch, getState) => {
  try {
    dispatch(getBalanceStart(account?.name));

    const wallet = getState()?.wallet;
    
    if (!wallet) {
      throw new Error('Wallet is not exist');
    }

    const balance = await accountService.getBalance(account, wallet);
    dispatch(setAccount({
      ...account,
      value: balance
    }));

  } catch (e) {
    throw e;
  } finally {
    dispatch(getBalanceFinish(account?.name));
  }
};