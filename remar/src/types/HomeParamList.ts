import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeParamList = {
  Feed: undefined;
  QueueDetail: { id: number };
  MyQueuesTab: {
    screen: string;
    params: { id: number };
    initial: boolean;
  };
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
