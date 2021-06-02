import { AntDesign } from '@expo/vector-icons';
import {
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import { Easing, TouchableOpacity } from 'react-native';
import { MyQueueDetailScreen } from '../../screens/App/MyQueues/MyQueueDetailScreen';
import { MyQueuesScreen } from '../../screens/App/MyQueues/MyQueuesScreen';
import {
  MyQueuesNavProps,
  MyQueuesParamList,
} from '../../types/MyQueuesParamList';

const Stack = createStackNavigator<MyQueuesParamList>();

export const MyQueuesStack = ({
  navigation,
}: MyQueuesNavProps<'MyQueues'>) => {
  return (
    <Stack.Navigator initialRouteName="MyQueues">
      <Stack.Screen
        name="MyQueues"
        component={MyQueuesScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="MyQueue"
        component={MyQueueDetailScreen}
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
                navigation.navigate('MyQueues');
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
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.RevealFromBottomAndroidSpec,
          },
          // transitionSpec: {
          //   open: {
          //     animation: 'spring',
          //     config: {
          //       stiffness: 1000,
          //       damping: 50,
          //       mass: 3,
          //       overshootClamping: false,
          //       restDisplacementThreshold: 0.01,
          //       restSpeedThreshold: 0.01,
          //     },
          //   },
          //   close: {
          //     animation: 'timing',
          //     config: {
          //       duration: 500,
          //       easing: Easing.linear,
          //     },
          //   },
          // },
        }}
      />
    </Stack.Navigator>
  );
};
