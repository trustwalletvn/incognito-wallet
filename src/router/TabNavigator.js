import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator, getActiveChildNavigationOptions } from 'react-navigation';
import { navigationOptionsHandler } from '@src/utils/router';
import Home from '@src/screens/Home';
import Setting from '@src/screens/Setting';
import { COLORS } from '@src/styles';
import TabBarIcon from '@src/components/TabBarIcon';
import icMinerActive from '@src/assets/images/icons/ic_tab_miner_active.png';
import icMinerDeactive from '@src/assets/images/icons/ic_tab_miner_deactive.png';
import HeaderBar from '@src/components/HeaderBar';
import MinerNavigator from './MinerNavigator';
import ROUTE_NAMES from './routeNames';

const TAG = 'TabNavigator';

const tabBarIcon = ({focused}) =>(
  <TabBarIcon
    image={focused ? icMinerActive
      : icMinerDeactive}
  />
);
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    height: 80
  },
  labelStyle: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center'
  },
});

const Tab = createBottomTabNavigator({
  [ROUTE_NAMES.Home]: navigationOptionsHandler(Home, { title: 'Wallet' }),
  [ROUTE_NAMES.RootMiner]: navigationOptionsHandler(MinerNavigator, { title: 'Miner',header:() => null,tabBarIcon:tabBarIcon }),
  [ROUTE_NAMES.Setting]: navigationOptionsHandler(Setting, { title: 'Setting' }),
}, {
  initialRouteName: ROUTE_NAMES.Home,
  tabBarOptions: {
    style: styles.container,
    labelStyle: styles.labelStyle,
    tabStyle: styles.tabStyle,
    activeTintColor: COLORS.blue
  },
  defaultNavigationOptions: {
    header: HeaderBar
  },
  headerMode:'screen',
  navigationOptions: ({ navigation, screenProps }) => {
    const child = getActiveChildNavigationOptions(navigation, screenProps);
    const { routeName } = navigation.state.routes[navigation.state.index];

    // console.log(TAG,'navigationOptions child = ',child);
    // You can do whatever you like here to pick the title based on the route name
    const title = routeName;
  
    return {
      title,
      ...child,
    };
  }
});

export default Tab;