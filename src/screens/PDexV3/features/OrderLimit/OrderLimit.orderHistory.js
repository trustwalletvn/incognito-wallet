import React from 'react';
import { StyleSheet } from 'react-native';

import { View, FlatList } from '@src/components/core';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistorySelector, poolIdSelector } from './OrderLimit.selector';
import Order from './OrderLimit.order';
import { actionFetchOrdersHistory } from './OrderLimit.actions';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    paddingVertical: 24,
  },
});

export const useHistoryOrders = () => {
  const poolId = useSelector(poolIdSelector);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionFetchOrdersHistory());
  }, [poolId]);
  return { poolId };
};

const OrderHistory = () => {
  const { history = [] } = useSelector(orderHistorySelector);
  useHistoryOrders();
  return (
    <View style={styled.container}>
      <FlatList
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
