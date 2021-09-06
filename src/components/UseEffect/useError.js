import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import {CONSTANT_CONFIGS} from '@src/constants';
import {useSelector} from 'react-redux';
import {accountSelector} from '@src/redux/selectors';
import {Text} from '@components/core';
import styles from '@screens/DexV2/components/TradeConfirm/style';

export const useError = (errorMessage) => {
  const navigation = useNavigation();
  const account = useSelector(accountSelector.defaultAccount);
  const navigateFaucet = () => navigation.navigate(routeNames.WebView, {
    url: CONSTANT_CONFIGS.FAUCET_URL + `address=${account.paymentAddress}`
  });
  return React.useMemo(() => {
    if (errorMessage.includes('Faucet')) {
      return (
        <Text style={styles.error}>
          Not enough coin to spend, please get some PRV at <Text style={[styles.error, {textDecorationLine: 'underline' }]} onPress={navigateFaucet}>Faucet</Text> tab in home screen.
        </Text>
      );
    }
    return errorMessage;
  }, [errorMessage]);
};