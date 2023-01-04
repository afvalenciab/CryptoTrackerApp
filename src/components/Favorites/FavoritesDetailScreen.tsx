/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import CoinMarketItem from '../coinDetails/CoinMarketItem';

import Storage from '../../utils/storage';
import Http from '../../utils/http';
import {colors} from '../../utils/colors';
import {CoinType} from '../coins/types';

import {RootStackParamList} from './types';

type FavoritesDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FavoritesDetail'
>;

const FavoritesDetailScreen = ({
  route,
  navigation,
}: FavoritesDetailScreenProps) => {
  const {coin} = route.params;
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    navigation.setOptions({title: coin?.symbol});
    getMarkets(coin.id);

    const validateFavorite = async () => {
      const isCoinFavorite = await Storage.instance.get(coin.id);
      setIsFavorite(Boolean(isCoinFavorite));
    };

    validateFavorite();
  }, [coin]);

  const getSymbolIcon = (symbol: string) => {
    if (symbol) {
      const symbolFormatted = symbol.toLocaleLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbolFormatted}.png`;
    }
  };

  const getMarkets = async (coinId: string) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const marketsData = await Http.instance.get(url);
    setMarkets(marketsData);
  };

  const getSections = (item: CoinType) => {
    return [
      {
        title: 'Market cap',
        data: [item.market_cap_usd],
      },
      {
        title: 'Change 24',
        data: [item.percent_change_24h],
      },
      {
        title: 'Volume 24',
        data: [item.volume24],
      },
    ];
  };

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      const isRemoved = await Storage.instance.remove(coin.id);
      setIsFavorite(!isRemoved);
    } else {
      const isSaved = await Storage.instance.set(coin.id, coin);
      setIsFavorite(isSaved);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.head}>
        <View style={style.row}>
          <Image style={style.image} source={{uri: getSymbolIcon(coin.name)}} />
          <Text style={style.title}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={handleToggleFavorite}
          style={[
            style.btnFavorite,
            isFavorite ? style.btnRemove : style.btnAdd,
          ]}>
          <Text style={{color: 'white'}}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>

      <View>
        <SectionList
          sections={getSections(coin)}
          keyExtractor={(item, index) => `${item}${index}`}
          renderSectionHeader={({section}) => (
            <View style={style.sectionHeader}>
              <Text style={style.sectionText}>{section.title}</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={style.sectionItem}>
              <Text style={style.itemText}>{item}</Text>
            </View>
          )}
        />
      </View>

      <View style={style.marketWrapper}>
        <Text style={style.title}>Markets</Text>
        <FlatList
          data={markets}
          horizontal={true}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  head: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  image: {
    marginRight: 8,
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 14,
  },
  sectionItem: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  itemText: {
    color: 'white',
    fontSize: 14,
  },
  marketWrapper: {
    paddingHorizontal: 14,
    paddingVertical: 26,
  },
  btnFavorite: {
    borderRadius: 8,
    padding: 8,
  },
  btnAdd: {
    backgroundColor: colors.picton,
  },
  btnRemove: {
    backgroundColor: colors.carmine,
  },
});

export default FavoritesDetailScreen;
