import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type MyCreatedQueuesParamList = {
  MyCreatedQueues: undefined;
  MyCreatedQueue: { id: any; newData?: any };
  PeopleOnTheQueue: { id: number };
};

export type MyCreatedQueuesNavProps<
  T extends keyof MyCreatedQueuesParamList,
> = {
  navigation: StackNavigationProp<MyCreatedQueuesParamList, T>;
  route: RouteProp<MyCreatedQueuesParamList, T>;
};
