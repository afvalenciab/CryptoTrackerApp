import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {colors} from '../../utils/colors';
import FavoritesScreen from './FavoritesScreen';
import FavoritesDetailScreen from './FavoritesDetailScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.blackPearl},
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="FavoritesDetail" component={FavoritesDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
