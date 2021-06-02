import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SearchScreen } from '../../screens/App/Search/SearchScreen';
import { AppCreatorParamList } from '../../types/CreatorRole/AppCreatorParamList';
import { HomeStack } from '../AllRoles/HomeStack';
import { UserStack } from '../AllRoles/UserStack';
import { MyCreatedQueuesStack } from './MyCreatedQueuesStack';

const Tabs = createBottomTabNavigator<AppCreatorParamList>();

export const CreatorAppTabs: React.FC = ({}) => {
  return (
    <Tabs.Navigator
      initialRouteName="MyCreatedQueuesTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'filter';

          if (route.name === 'MyCreatedQueuesTab') {
            iconName = 'calendar';
          } else if (route.name === 'UserTab') {
            iconName = 'user';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="MyCreatedQueuesTab"
        component={MyCreatedQueuesStack}
        options={{ title: 'Minu järjekorrad' }}
      />
      <Tabs.Screen
        name="UserTab"
        component={UserStack}
        options={{ title: 'Kasutaja' }}
      />
    </Tabs.Navigator>
  );
};
