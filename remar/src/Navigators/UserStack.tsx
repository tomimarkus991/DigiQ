import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { UserScreen } from '../screens/App/User/UserScreen';
import { UserNavProps, UserParamList } from '../types/UserParamList';

const Stack = createStackNavigator<UserParamList>();

export const UserStack = ({ navigation }: UserNavProps<'UserScreen'>) => {
  return (
    <Stack.Navigator initialRouteName="UserScreen">
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
