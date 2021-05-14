import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeParamList = {
  Feed: undefined;
  Queue: { id: number };
  JoinedQueue: { currentQueueName: string; data: any };
};

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
