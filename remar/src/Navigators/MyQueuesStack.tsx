import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MyQueueScreen } from '../screens/App/MyQueues/MyQueueScreen';
import { MyQueuesScreen } from '../screens/App/MyQueues/MyQueuesScreen';
import { MyQueuesNavProps, MyQueuesParamList } from '../types/MyQueuesParamList';

const Stack = createStackNavigator<MyQueuesParamList>();

export const MyQueuesStack = ({}: MyQueuesNavProps<'MyQueues'>) => {
  return (
    <Stack.Navigator initialRouteName="MyQueues">
      <Stack.Screen
        name="MyQueues"
        component={MyQueuesScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="MyQueue"
        component={MyQueueScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
