export const TYPES = {
  ACTION_SET_CONTRIBUTE_POOL_ID: '[pDexV3][liquidity] Set contribute poolID',
  ACTION_FETCHING_CONTRIBUTE_DATA: '[pDexV3][liquidity] Fetching contribute data',
  ACTION_SET_CONTRIBUTE_POOL_DATA: '[pDexV3][liquidity] Set contribute pool data',

  ACTION_SET_CREATE_POOL_TOKEN: '[pDexV3][liquidity] Set create pool token',

  ACTION_SET_REMOVE_FETCHING: '[pDexV3][liquidity] Set remove pool fetching',
  ACTION_SET_REMOVE_POOL_ID: '[pDexV3][liquidity] Set remove pool poolID',
  ACTION_SET_REMOVE_POOL_TOKEN: '[pDexV3][liquidity] Set remove pool token',
};

export const LIQUIDITY_MESSAGES = {
  addLiquidity: 'Add liquidity',
  createPool : 'Create liquidity',
  removePool : 'Remove liquidity'
};

export const formConfigsContribute = {
  formName: 'FORM_CONTRIBUTE',
  inputToken: 'inputToken',
  outputToken: 'outputToken',
};

export const formConfigsCreatePool = {
  formName: 'FORM_CREATE_POOL',
  inputToken: 'inputToken',
  outputToken: 'outputToken',
};

export const formConfigsRemovePool = {
  formName: 'FORM_REMOVE_POOL',
  inputToken: 'inputToken',
  outputToken: 'outputToken',
};

export const SUCCESS_MODAL = {
  ADD_POOL: {
    title: 'Liquidity added',
    desc: 'Please wait a few minutes for your\n' +
  'added liquidity to display.\n' +
  'Thanks for providing privacy.',
  },
  CREATE_POOL: {
    title: 'Liquidity added',
    desc: 'Please wait a few minutes for your\n' +
  'added liquidity to display.\n' +
  'Thanks for providing privacy.',
  },
  REMOVE_POOL: {
    title: 'Remove added',
    desc: 'Please wait a few minutes for your\n' +
      'added remove pool to display.\n' +
      'Thanks for providing privacy.',
  }
};
