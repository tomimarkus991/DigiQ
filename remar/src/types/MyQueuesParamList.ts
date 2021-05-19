import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type MyQueuesParamList = {
  MyQueues: undefined;
  MyQueue: { id: any; newData?: any };
};

export type MyQueuesNavProps<T extends keyof MyQueuesParamList> = {
  navigation: StackNavigationProp<MyQueuesParamList, T>;
  route: RouteProp<MyQueuesParamList, T>;
};
