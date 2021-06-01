import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CreatorScreen } from '../../screens/App/User/CreatorScreen';
import { SettingsScreen } from '../../screens/App/User/SettingsScreen';
import { UserScreen } from '../../screens/App/User/UserScreen';
import { UserNavProps, UserParamList } from '../../types/UserParamList';

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
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="CreatorScreen"
        component={CreatorScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
