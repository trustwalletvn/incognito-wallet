import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '@src/components';
import {
  handleFilterTokenByKeySearch,
  TokenTrade,
} from '@src/components/Token';
import { useSearchBox } from '@src/components/Header';
import { withLayout_2 } from '@src/components/Layout';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { delay } from '@src/utils/delay';
import { ListAllTokenSelectable } from './SelectToken';

const styled = StyleSheet.create({
  container: { flex: 1 },
  extra: {
    marginTop: 16,
    flex: 1,
  },
  header: {},
});

const SelectTokenModal = () => {
  const data = useNavigationParam('data');
  const onPress = useNavigationParam('onPress');
  const [availableTokens, keySearch] = useSearchBox({
    data,
    shouldCleanSearch: false,
    handleFilter: () =>
      handleFilterTokenByKeySearch({ tokens: data, keySearch }),
  });
  const { goBack } = useNavigation();
  if (!data) {
    return null;
  }
  return (
    <View style={styled.container}>
      <Header
        title="Select coins"
        style={styled.header}
        canSearch
      />
      <View style={styled.extra}>
        <ListAllTokenSelectable
          availableTokens={availableTokens}
          renderItem={({ item }) => (
            <TokenTrade
              onPress={async () => {
                goBack();
                await delay(0);
                if (typeof onPress === 'function') {
                  onPress(item);
                }
              }}
              tokenId={item?.tokenId}
            />
          )}
        />
      </View>
    </View>
  );
};

SelectTokenModal.propTypes = {};

export default withLayout_2(React.memo(SelectTokenModal));
