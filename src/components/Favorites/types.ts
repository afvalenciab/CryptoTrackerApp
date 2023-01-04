import {CoinType} from '../coins/types';

export type RootStackParamList = {
  Favorites: undefined;
  FavoritesDetail: {coin: CoinType};
};
