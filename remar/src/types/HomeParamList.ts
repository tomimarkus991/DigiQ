import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeParamList = {
  Feed: undefined;
  QueueDetail: { id: number };
  CreateQueue: undefined;
  MyQueuesTab: { screen: string; params: { id: number; newData: any }; initial: boolean };
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
