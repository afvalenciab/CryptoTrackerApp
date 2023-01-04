import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors} from '../../utils/colors';
import Storage from '../../utils/storage';
import CoinItem from '../coins/CoinItem';
import {CoinType} from '../coins/types';

import EmptyState from './EmptyState';
import {RootStackParamList} from './types';

type FavoriteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Favorites'
>;

const FavoritesScreen = ({navigation}: FavoriteScreenProps) => {
  const [favoriteList, setFavoriteList] = useState<any>([]);

  useEffect(() => {
    const getAllFavorites = async () => {
      const response = await Storage.instance.multiGet();
      const responseAux = response.map(item => item[1]);
      setFavoriteList(responseAux);
    };

    getAllFavorites();
  });

  const handlePress = (coin: CoinType) => {
    navigation.navigate('FavoritesDetail', {coin});
  };

  return (
    <View style={styles.container}>
      {!favoriteList.length ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favoriteList}
          renderItem={({item}) => (
            <CoinItem data={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});

export default FavoritesScreen;
