import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MyQueueScreenProps {}

export const MyQueueScreen: React.FC<MyQueueScreenProps> = ({}) => {
  return (
    <View>
      <Text>Joined the line</Text>
      <Text>Ole palun kohal kell:</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
