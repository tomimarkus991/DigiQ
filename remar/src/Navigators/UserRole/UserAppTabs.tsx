import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScanScreen } from '../../screens/App/Scan/ScanScreen';
import { SearchScreen } from '../../screens/App/Search/SearchScreen';
import { AppParamList } from '../../types/UserRole/AppParamList';
import { HomeStack } from '../AllRoles/HomeStack';
import { MyQueuesStack } from './MyQueuesStack';
import { UserStack } from '../AllRoles/UserStack';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const UserAppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      initialRouteName="HomeTab"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'filter';

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'SearchTab') {
            iconName = 'search1';
          } else if (route.name === 'MyQueuesTab') {
            iconName = 'calendar';
          } else if (route.name === 'ScanTab') {
            iconName = 'scan1';
          } else if (route.name === 'UserTab') {
            iconName = 'user';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="ScanTab"
        component={ScanScreen}
        options={{ title: 'Skänni' }}
      />
      <Tabs.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: 'Otsi' }}
      />
      <Tabs.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Kodu' }}
      />
      <Tabs.Screen
        name="MyQueuesTab"
        component={MyQueuesStack}
        options={{ title: 'Minu Järjekorrad' }}
      />
      <Tabs.Screen
        name="UserTab"
        component={UserStack}
        options={{ title: 'Kasutaja' }}
      />
    </Tabs.Navigator>
  );
};
