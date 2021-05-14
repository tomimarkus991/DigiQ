import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/App/HomeScreen';
import { JoinedQueueScreen } from '../screens/App/JoinedQueueScreen';
import { QueueDetailScreen } from '../screens/App/QueueDetailScreen';
import { HomeParamList } from '../types/HomeParamList';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={HomeScreen} options={{ header: () => null }} />
      <Stack.Screen
        name="Queue"
        component={QueueDetailScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="JoinedQueue"
        component={JoinedQueueScreen}
        options={({ route }) => ({
          headerTitle: route.params.currentQueueName,
        })}
      />
    </Stack.Navigator>
  );
};
