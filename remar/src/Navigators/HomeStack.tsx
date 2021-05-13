import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/App/HomeScreen';
import { JoinedLineScreen } from '../screens/App/JoinedQueueScreen';
import { LineScreen } from '../screens/App/QueueScreen';
import { HomeParamList } from '../types/HomeParamList';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={HomeScreen} options={{ header: () => null }} />
      <Stack.Screen
        name="Line"
        component={LineScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="JoinedLine"
        component={JoinedLineScreen}
        options={({ route }) => ({
          headerTitle: route.params.currentQueueName,
        })}
      />
    </Stack.Navigator>
  );
};
