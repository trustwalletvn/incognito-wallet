import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList, RefreshControl } from '@src/components/core';
import { Header } from '@src/components';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetNFTTokenData } from '@src/redux/actions/account';
import { ExHandler } from '@src/services/exception';
import { useFocusEffect } from 'react-navigation-hooks';
import { orderHistorySelector } from './OrderLimit.selector';
import Order from './OrderLimit.order';
import {
  actionFetchOrdersHistory,
  actionFetchWithdrawOrderTxs,
} from './OrderLimit.actions';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    paddingVertical: 24,
  },
});

const OrderHistory = () => {
  const dispatch = useDispatch();
  const onRefresh = async () => {
    try {
      dispatch(actionFetchOrdersHistory());
      dispatch(actionFetchWithdrawOrderTxs());
      dispatch(actionSetNFTTokenData());
    } catch (error) {
      console.log('ERROR HERE', error);
      new ExHandler(error).showErrorToast();
    }
  };
  const { history = [], isFetching } = useSelector(orderHistorySelector);
  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );
  return (
    <View style={styled.container}>
      <Header title="Order history" />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        data={history}
        keyExtractor={(item) => item?.requestTx}
        renderItem={({ item, index }) => (
          <Order data={item} visibleDivider={index !== history.length - 1} />
        )}
        contentContainerStyle={styled.flatlist}
      />
    </View>
  );
};

OrderHistory.propTypes = {};

export default React.memo(OrderHistory);