import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MarketItemProps {
  item: {
    name: string;
    price_usd: number;
  };
}

const CoinMarketItem = ({item}: MarketItemProps) => {
  return (
    <View style={style.container}>
      <Text style={style.name}>{item.name}</Text>
      <Text style={style.price}>{item.price_usd}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginRight: 8,
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    paddingBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '200',
    color: 'white',
  },
});

export default CoinMarketItem;
