import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  MyQueuesTab: undefined;
  ScanTab: undefined;
  UserTab: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
