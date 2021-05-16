import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/App/Home/HomeScreen';
import { MyQueueScreen } from '../screens/App/User/MyQueueScreen';
import { QueueDetailScreen } from '../screens/App/Home/QueueDetailScreen';
import { UserScreen } from '../screens/App/User/UserScreen';
import { HomeParamList } from '../types/HomeParamList';
import { UserNavProps, UserParamList } from '../types/UserParamList';
import { MyQueuesScreen } from '../screens/App/User/MyQueuesScreen';

const Stack = createStackNavigator<UserParamList>();

export const UserStack = ({ navigation }: UserNavProps<'UserScreen'>) => {
  return (
    <Stack.Navigator initialRouteName="UserScreen">
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="MyQueues"
        component={MyQueuesScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('UserScreen')} />
          ),
        }}
      />
      <Stack.Screen
        name="MyQueue"
        component={MyQueueScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('MyQueues')} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
