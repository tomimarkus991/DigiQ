import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type UserParamList = {
  UserScreen: undefined;
  MyQueues: undefined;
  MyQueue: { id: any };
};

export type UserNavProps<T extends keyof UserParamList> = {
  navigation: StackNavigationProp<UserParamList, T>;
  route: RouteProp<UserParamList, T>;
};
