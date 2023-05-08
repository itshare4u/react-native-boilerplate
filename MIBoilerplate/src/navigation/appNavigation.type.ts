import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';

export enum Screen {
  SETTING = 'SETTING',
  NEWS_LIST = 'NEWS_LIST',
  NEWS_DETAIL = 'NEWS_DETAIL',
}

export type NavStackParams = {
  [Screen.SETTING]: undefined;
  [Screen.NEWS_LIST]: undefined;
  [Screen.NEWS_DETAIL]: NewsDetailParams;
};

export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

export type NewsDetailRoute = RouteProp<NavStackParams, Screen.NEWS_DETAIL>;