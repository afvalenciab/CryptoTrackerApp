import React from 'react';
import {Text, View, StyleSheet, Image, Platform, Pressable} from 'react-native';
import {colors} from '../../utils/colors';
import {CoinType} from './types';

interface CoinProps {
  data: CoinType;
  onPress: () => void;
}

const CoinItem = ({data, onPress}: CoinProps) => {
  const getImageArrow = () => {
    return data?.percent_change_1h > 0
      ? require('../../assets/arrow_up.png')
      : require('../../assets/arrow_down.png');
  };

  return (
    <Pressable style={style.container} onPress={onPress}>
      <View style={style.row}>
        <Text style={style.symbolText}>{data?.symbol}</Text>
        <Text style={style.nameText}>{data?.name}</Text>
        <Text style={style.priceText}>{`$ ${data?.price_usd}`}</Text>
      </View>

      <View style={style.row}>
        <Text style={style.percentText}>{data?.percent_change_1h}</Text>
        <Image style={style.image} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.zircon,
    borderBottomWidth: 0.5,
    marginHorizontal: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: 'white',
    fontSize: 14,
    marginRight: 12,
  },
  percentText: {
    color: 'white',
    fontSize: 12,
    marginRight: 5,
  },
  priceText: {
    color: 'white',
    fontSize: 14,
  },
  image: {
    width: 15,
    height: 15,
  },
});

export default CoinItem;
