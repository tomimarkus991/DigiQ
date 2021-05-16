import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/App/Home/HomeScreen';
import { MyQueueScreen } from '../screens/App/User/MyQueueScreen';
import { QueueDetailScreen } from '../screens/App/Home/QueueDetailScreen';
import { HomeParamList } from '../types/HomeParamList';
interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={HomeScreen} options={{ header: () => null }} />
      <Stack.Screen
        name="QueueDetail"
        component={QueueDetailScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
