import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors} from '../../utils/colors';

import CoinsScreen from './CoinsScreen';
import CoinDetailsScreen from '../coinDetails/CoinDetailsScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.blackPearl},
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
