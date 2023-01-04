import {NavigatorScreenParams} from '@react-navigation/native';

import {RootStackParamList as FavoritesStackParamList} from '../Favorites/types';

export type RootStackParamList = {
  Coins: undefined;
  CoinDetails: {coin: CoinType};
};

export type RootTabsParamList = {
  CoinsTab: NavigatorScreenParams<RootStackParamList>;
  FavoritesTab: NavigatorScreenParams<FavoritesStackParamList>;
};

export type CoinType = {
  id: string;
  name: string;
  symbol: string;
  percent_change_1h: number;
  price_usd: number;
  percent_change_24h: number;
  volume24: number;
  market_cap_usd: number;
};
