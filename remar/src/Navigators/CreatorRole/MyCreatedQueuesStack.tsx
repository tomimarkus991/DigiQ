import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CreateQueueScreen } from '../../screens/App/Home/CreateQueueScreen';
import { MyCreatedQueueDetailScreen } from '../../screens/App/MyCreatedQueues/MyCreatedQueueDetailScreen';
import { MyCreatedQueuesScreen } from '../../screens/App/MyCreatedQueues/MyCreatedQueuesScreen';
import {
  MyCreatedQueuesNavProps,
  MyCreatedQueuesParamList,
} from '../../types/MyCreatedQueuesParamList';

const Stack = createStackNavigator<MyCreatedQueuesParamList>();

export const MyCreatedQueuesStack = ({
  navigation,
}: MyCreatedQueuesNavProps<'MyCreatedQueues'>) => {
  return (
    <Stack.Navigator initialRouteName="MyCreatedQueues">
      <Stack.Screen
        name="MyCreatedQueues"
        component={MyCreatedQueuesScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="MyCreatedQueue"
        component={MyCreatedQueueDetailScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                marginTop: 10,
                backgroundColor: '#fff',
                borderRadius: 30,
                padding: 5,
              }}
              onPress={() => {
                navigation.navigate('MyCreatedQueues');
              }}
            >
              <AntDesign
                name="leftcircle"
                size={42}
                color="black"
                style={{ backgroundColor: '#fff', borderRadius: 100 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CreateQueue"
        component={CreateQueueScreen}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};
