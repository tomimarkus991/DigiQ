import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/App/HomeScreen';
import { JoinedLineScreen } from '../screens/App/JoinedLineScreen';
import { LineScreen } from '../screens/App/LineScreen';
import { HomeParamList } from '../types/HomeParamList';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Line"
        component={LineScreen}
        options={({ route }) => ({
          headerTitle: route.params.queueName,
        })}
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
