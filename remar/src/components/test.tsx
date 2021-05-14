import React from 'react';
import { View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface testProps {}

export const test: React.FC<testProps> = ({}) => {
  return (
    <View>
      <Swipeable></Swipeable>
    </View>
  );
};
