import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScanScreen } from '../screens/App/Scan/ScanScreen';
import { SearchScreen } from '../screens/App/Search/SearchScreen';
import { AppParamList } from '../types/AppParamList';
import { HomeStack } from './HomeStack';
import { UserStack } from './UserStack';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'filter';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search1';
          } else if (route.name === 'Scan') {
            iconName = 'scan1';
          } else if (route.name === 'User') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeStack}></Tabs.Screen>
      <Tabs.Screen name="Search" component={SearchScreen}></Tabs.Screen>
      <Tabs.Screen name="Scan" component={ScanScreen}></Tabs.Screen>
      <Tabs.Screen name="User" component={UserStack}></Tabs.Screen>
    </Tabs.Navigator>
  );
};
