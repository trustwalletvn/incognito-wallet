import {
  Wallet,
  RpcClient,
  getEstimateFee,
  getEstimateFeeForPToken as getEstimateFeeForPTokenService,
  getEstimateTokenFee,
  getMaxWithdrawAmount
} from 'incognito-chain-web-js/build/wallet';
import { ExHandler, CustomError, ErrorCode } from '../exception';

function getRpcClient() {
  return Wallet.RpcClient;
}

function setRpcClientInterceptor() {
  const instance = Wallet.RpcClient?.rpcHttpService?.axios;

  instance?.interceptors.response.use(res => {
    return Promise.resolve(res);
  }, errorData => {
    const errResponse = errorData?.response;

    // can not get response, alert to user
    if (!errResponse) {
      return new ExHandler(new CustomError(ErrorCode.network_make_request_failed)).throw();
    }

    return Promise.reject(errorData);
  });
}

export function setRpcClient(server, username, password) {
  Wallet.RpcClient = new RpcClient(server, username, password);
}

export function listCustomTokens() {
  return getRpcClient().listCustomTokens();
}

export function listPrivacyTokens() {
  return getRpcClient().listPrivacyCustomTokens();
}

/**
 * 
 * @param {string} from Incognito Address
 * @param {string} to Incognito Address
 * @param {number} amount nano unit
 * @param {object} accountWallet get from WalletService.getAccountByName(accountName);
 * @param {bool} isPrivacy default `true`
 * 
 * Estimate fee for sending native token (PRV), fee is returned in PRV nano unit
 */
export async function getEstimateFeeForNativeToken(
  from,
  to,
  amount,
  accountWallet,
  isPrivacy = true
) {
  console.log('Estimating fee ...');
  let fee;
  try {
    fee = await getEstimateFee(
      from,
      to,
      amount,
      accountWallet,
      isPrivacy,
      getRpcClient()
    );
  } catch (e) {
    throw e;
  }
  return fee;
}

/**
 * 
 * @param {string} from 
 * @param {string} to 
 * @param {number} amount in nano
 * @param {object} tokenObject 
 * @param {object} account get from WalletService.getAccountByName(accountName);
 * @param {number} feeToken  in nano
 * @param {bool} isGetTokenFee default `false`
 * 
 * Estimate fee for sending PRIVATE_TOKEN (pETH, pBTC, Incognito Custom Tokens,...) in
 * - nano PRV if `isGetTokenFee` is `false` (default)
 * - nano PRIVATE_TOKEN if `isGetTokenFee` is `true`
 * 
 * tokenObject format
 * @param {bool} Privacy 
 * @param {string} TokenID 
 * @param {string} TokenName 
 * @param {string} TokenSymbol 
 * @param {string} TokenTxType see here CONSTANT_COMMONS.TOKEN_TX_TYPE
 * @param {string} TokenAmount in nano
 * @param {string} TokenReceivers  { PaymentAddress: string, Amount: number in nano }
 */
export async function getEstimateFeeForPToken(
  from,
  to,
  amount,
  tokenObject,
  account,
  isGetTokenFee = false
) {
  let fee;
  const isPrivacyForNativeToken = false;
  const isPrivacyForPrivateToken = true;
  const feeToken = 0;
  try {
    fee = await getEstimateFeeForPTokenService(
      from,
      to,
      amount,
      tokenObject,
      account,
      getRpcClient(),
      isPrivacyForNativeToken,
      isPrivacyForPrivateToken,
      feeToken,
      isGetTokenFee
    );
  } catch (e) {
    throw e;
  }
  return fee;
}

export async function getEstimateTokenFeeService(
  from,
  to,
  amount,
  tokenObject,
  privateKey,
  account,
  isPrivacyForPrivateToken
) {
  console.log('getEstimateTokenFee');
  console.log('\tfrom:' + from);
  console.log('\tto: ' + to);
  console.log('\tamount:' + amount);
  console.log('\ttokenObject', tokenObject);
  console.log('\tprivateKey', privateKey);
  console.log('HHHHHHHH : ', typeof getEstimateTokenFee);

  let fee;
  try {
    fee = await getEstimateTokenFee(
      from,
      to,
      amount,
      tokenObject,
      privateKey,
      account,
      getRpcClient(),
      isPrivacyForPrivateToken
    );
  } catch (e) {
    throw e;
  }
  return fee;
}

export async function getStakingAmount(type) {
  let resp;
  try {
    resp = await getRpcClient().getStakingAmount(type);
  } catch (e) {
    throw e;
  }
  return resp.res;
}

export async function getActiveShard() {
  let resp;
  try {
    resp = await getRpcClient().getActiveShard();
  } catch (e) {
    throw e;
  }

  return resp.shardNumber;
}

export async function getMaxShardNumber() {
  let resp;
  try {
    resp = await getRpcClient().getMaxShardNumber();
  } catch (e) {
    throw e;
  }

  return resp.shardNumber;
}

export async function hashToIdenticon(hashStrs) {
  let resp;
  try {
    resp = await getRpcClient().hashToIdenticon(hashStrs);
  } catch (e) {
    throw e;
  }

  return resp.images;
}

export async function getMaxWithdrawAmountService(
  from,
  to,
  tokenObject,
  privateKey,
  account,
  isPrivacyForPrivateToken
) {
  let response;
  try {
    response = await getMaxWithdrawAmount(
      from,
      to,
      tokenObject,
      privateKey,
      account,
      getRpcClient(),
      isPrivacyForPrivateToken
    );
  } catch (e) {
    throw e;
  }
  return response;
}

setRpcClientInterceptor();