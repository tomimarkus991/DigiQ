import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { AuthParamList } from '../types/AuthParamList';

interface AuthStackProps {}
const Stack = createStackNavigator<AuthParamList>();
export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};
