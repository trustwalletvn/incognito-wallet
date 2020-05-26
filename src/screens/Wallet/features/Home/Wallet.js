import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Header from '@src/components/Header';
import { BtnSelectAccount } from '@screens/SelectAccount';
import { ButtonBasic, BtnQRCode, BtnClose } from '@src/components/Button';
import { tokenSeleclor } from '@src/redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import Token from '@src/components/Token';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { CONSTANT_COMMONS } from '@src/constants';
import {
  totalShieldedTokensSelector,
  isGettingBalance as isGettingTotalBalanceSelector,
} from '@src/redux/selectors/shared';
import { Amount } from '@src/components/Token/Token';
import { shieldStorageSelector } from '@src/screens/Shield/Shield.selector';
import { actionToggleGuide } from '@src/screens/Shield/Shield.actions';
import Tooltip from '@src/components/Tooltip/Tooltip';
import { COLORS } from '@src/styles';
import { actionToggleModal } from '@components/Modal';
import UnShieldModal from '@screens/UnShield/UnShield.modal';
import isNaN from 'lodash/isNaN';
import {
  styled,
  styledHook,
  styledBalance,
  styledAddToken,
  styledFollow,
  extraStyled,
  styledToken,
  rightHeaderStyled,
} from './Wallet.styled';
import withWallet, { WalletContext } from './Wallet.enhance';

const GroupButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { guide } = useSelector(shieldStorageSelector);
  const handleUnShield = async () => {
    await dispatch(
      actionToggleModal({
        data: <UnShieldModal />,
        visible: true,
      }),
    );
  };
  const handleShield = async () => {
    navigation.navigate(routeNames.Shield);
    if (!guide) {
      await dispatch(actionToggleGuide());
    }
  };
  return (
    <View style={styled.groupButtonContainer}>
      {!guide && (
        <Tooltip
          content={<Hook />}
          containerStyle={{
            backgroundColor: COLORS.black,
            borderRadius: 11,
            marginBottom: 20,
          }}
          triangleStyle={{
            bottom: -30,
            left: 50,
            borderBottomColor: COLORS.black,
          }}
        />
      )}
      <View style={styled.groupButton}>
        <ButtonBasic
          title="Shield"
          btnStyle={[styled.btnStyle]}
          titleStyle={[styled.titleStyle]}
          onPress={handleShield}
        />
        <ButtonBasic
          title="Unshield"
          btnStyle={styled.btnStyle}
          titleStyle={styled.titleStyle}
          onPress={handleUnShield}
        />
      </View>
    </View>
  );
};

const Hook = () => {
  const dispatch = useDispatch();
  const { guide } = useSelector(shieldStorageSelector);
  const handleCloseShield = async () => {
    if (!guide) {
      await dispatch(actionToggleGuide());
    }
  };
  return (
    <View style={styledHook.container}>
      <View style={styledHook.btnClose}>
        <BtnClose size={24} onPress={handleCloseShield} />
      </View>
      <Text style={styledHook.title}>Transact without a trace.</Text>
      <Text style={styledHook.desc}>
        {
          'Shield any amount of any cryptocurrency.\nTurn your public coins into privacy coins.'
        }
      </Text>
    </View>
  );
};

const Balance = () => {
  let totalShielded = useSelector(totalShieldedTokensSelector);
  const isGettingTotalBalance =
    useSelector(isGettingTotalBalanceSelector).length > 0;
  if (isNaN(totalShielded)) {
    totalShielded = 0;
  }
  return (
    <View style={styledBalance.container}>
      <Amount
        amount={totalShielded}
        pDecimals={0}
        showSymbol={false}
        isGettingBalance={isGettingTotalBalance}
        showGettingBalance
        customStyle={styledBalance.balance}
        hasPSymbol
        stylePSymbol={styledBalance.pSymbol}
        containerStyle={styledBalance.balanceContainer}
      />
      <Text style={styledBalance.title}>Shielded Balance</Text>
    </View>
  );
};

const FollowToken = () => {
  const followed = useSelector(tokenSeleclor.tokensFollowedSelector);
  const { walletProps } = React.useContext(WalletContext);
  const { handleSelectToken, handleRemoveToken } = walletProps;
  return (
    <View style={styledFollow.container}>
      <Token
        tokenId={CONSTANT_COMMONS.PRV_TOKEN_ID}
        style={[
          styledFollow.token,
          followed.length === 0 && styledToken.lastChild,
        ]}
        onPress={() => handleSelectToken(CONSTANT_COMMONS.PRV_TOKEN_ID)}
      />
      {followed.map((token, index) => (
        <Token
          key={token?.id}
          tokenId={token?.id}
          style={[followed.length - 1 === index && styledToken.lastChild]}
          onPress={() => handleSelectToken(token?.id)}
          handleRemoveToken={() => handleRemoveToken(token?.id)}
          swipable
          removable
        />
      ))}
    </View>
  );
};

const AddToken = () => {
  const navigation = useNavigation();
  const handleFollowToken = () => navigation.navigate(routeNames.FollowToken);
  return (
    <TouchableWithoutFeedback onPress={handleFollowToken}>
      <View style={styledAddToken.container}>
        <Text style={styledAddToken.title}>Add a coin +</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Extra = () => {
  const { walletProps } = React.useContext(WalletContext);
  const { isReloading, fetchData } = walletProps;
  return (
    <View style={extraStyled.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={isReloading}
            onRefresh={() => fetchData(true)}
          />
        )}
      >
        <Balance />
        <GroupButton />
        <FollowToken />
        <AddToken />
      </ScrollView>
    </View>
  );
};

const RightHeader = () => {
  const { walletProps } = React.useContext(WalletContext);
  const { handleExportKey } = walletProps;
  return (
    <View style={rightHeaderStyled.container}>
      <BtnQRCode
        style={rightHeaderStyled.btnExportKey}
        onPress={handleExportKey}
      />
      <BtnSelectAccount />
    </View>
  );
};

const Wallet = () => {
  const navigation = useNavigation();
  return (
    <View style={[styled.container]}>
      <Header
        title="Assets"
        rightHeader={<RightHeader />}
        onGoBack={() => navigation.navigate(routeNames.Home)}
      />
      <Extra />
    </View>
  );
};

Wallet.propTypes = {};

export default withWallet(Wallet);