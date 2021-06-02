import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../../screens/App/Home/HomeScreen';
import { QueueDetailScreen } from '../../screens/App/Home/QueueDetailScreen';
import { HomeNavProps, HomeParamList } from '../../types/HomeParamList';
import { CreateQueueScreen } from '../../screens/App/Home/CreateQueueScreen';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack = ({ navigation }: HomeNavProps<'Feed'>) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="QueueDetail"
        component={QueueDetailScreen}
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
                navigation.navigate('Feed');
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
    </Stack.Navigator>
  );
};
