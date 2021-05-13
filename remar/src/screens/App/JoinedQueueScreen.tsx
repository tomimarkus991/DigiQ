import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface JoinedLineScreenProps {}

export const JoinedLineScreen: React.FC<JoinedLineScreenProps> = ({}) => {
  return (
    <View>
      <Text>Joined the line</Text>
      <Text>Ole palun kohal kell:</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
