import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { reducer as formReducer } from 'redux-form';
import wallet from './wallet';
import account from './account';
import server from './server';
import token from './token';
import selectedPrivacy from './selectedPrivacy';
import app from './app';
import dex from './dex';
import globalReducer from './globalReducer';

const rootReducer = reduceReducers(
  combineReducers({
    account,
    wallet,
    server,
    token,
    selectedPrivacy,
    app,
    dex,
    form: formReducer
  }),
  globalReducer
);

export default rootReducer;
