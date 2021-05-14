import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface JoinedQueueScreenProps {}

export const JoinedQueueScreen: React.FC<JoinedQueueScreenProps> = ({}) => {
  return (
    <View>
      <Text>Joined the line</Text>
      <Text>Ole palun kohal kell:</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
