import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import Http from '../../utils/http';
import {colors} from '../../utils/colors';

import CoinItem from './CoinItem';
import CoinSearch from './CoinSearch';
import {RootStackParamList, CoinType} from './types';

type CoinsScreenProps = NativeStackScreenProps<RootStackParamList, 'Coins'>;

const CoinsScreen = ({navigation}: CoinsScreenProps) => {
  const [data, setData] = useState<CoinType[]>([]);
  const [allCoins, setAllCoins] = useState<CoinType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Http.instance
      .get('https://api.coinlore.net/api/tickers/')
      .then(response => {
        setData(response.data);
        setAllCoins(response.data);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handlePress = (coin: CoinType) => {
    navigation.navigate('CoinDetails', {coin});
  };

  const handleSearchCoin = (value: string) => {
    const coinsFiltered = allCoins.filter(
      item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(value.toLowerCase()),
    );

    setData(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearchCoin} />

      {isLoading && <ActivityIndicator style={styles.loading} size="large" />}

      <FlatList
        data={data}
        renderItem={({item}) => (
          <CoinItem data={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    margin: 10,
    backgroundColor: colors.charade,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  loading: {
    margin: 30,
  },
});

export default CoinsScreen;
