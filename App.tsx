/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

//  import React, {type PropsWithChildren} from 'react';
//  const Section: React.FC<PropsWithChildren<{title: string}>> = ({
//   children,
//   title,
// }) => {}

import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CoinsStack from './src/components/coins/CoinsStack';
import FavoritesStack from './src/components/Favorites/FavoritesStack';

import {RootTabsParamList} from './src/components/coins/types';
import {colors} from './src/utils/colors';

const Tab = createBottomTabNavigator<RootTabsParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: '#fefefe',
          tabBarStyle: {backgroundColor: colors.blackPearl, padding: 5},
        }}>
        <Tab.Screen
          name="CoinsTab"
          component={CoinsStack}
          options={{
            tabBarLabel: 'Coins',
            tabBarIcon: ({color, size}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/bank.png')}
              />
            ),
          }}
        />

        <Tab.Screen
          name="FavoritesTab"
          component={FavoritesStack}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({color, size}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/star.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
