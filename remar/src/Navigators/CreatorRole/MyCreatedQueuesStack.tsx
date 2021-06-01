import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MyCreatedQueueDetailScreen } from '../../screens/App/MyCreatedQueues/MyCreatedQueueDetailScreen';
import { MyCreatedQueuesScreen } from '../../screens/App/MyCreatedQueues/MyCreatedQueuesScreen';
import { PeopleOnTheQueueScreen } from '../../screens/App/MyCreatedQueues/PeopleOnTheQueueScreen';
import {
  MyCreatedQueuesNavProps,
  MyCreatedQueuesParamList,
} from '../../types/MyCreatedQueuesParamList';

const Stack = createStackNavigator<MyCreatedQueuesParamList>();

export const MyCreatedQueuesStack =
  ({}: MyCreatedQueuesNavProps<'MyCreatedQueues'>) => {
    return (
      <Stack.Navigator initialRouteName="MyCreatedQueues">
        <Stack.Screen
          name="MyCreatedQueues"
          component={MyCreatedQueuesScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MyCreatedQueue"
          component={MyCreatedQueueDetailScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="PeopleOnTheQueue"
          component={PeopleOnTheQueueScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    );
  };
