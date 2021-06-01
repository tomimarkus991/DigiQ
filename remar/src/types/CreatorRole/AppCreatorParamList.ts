import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppCreatorParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  MyCreatedQueuesTab: undefined;
  UserTab: undefined;
};

export type AppCreatorNavProps<T extends keyof AppCreatorParamList> = {
  navigation: StackNavigationProp<AppCreatorParamList, T>;
  route: RouteProp<AppCreatorParamList, T>;
};
