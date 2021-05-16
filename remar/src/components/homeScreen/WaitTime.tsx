import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { MyFonts, MyColors } from '../../global';

interface WaitTimeProps {
  shortestWaitingTime: number;
  longestWaitingTime: number;
  textProps?: any;
}

export const WaitTime: React.FC<WaitTimeProps> = ({
  shortestWaitingTime,
  longestWaitingTime,
  textProps,
}) => {
  return (
    <View style={{ ...styles.estimatedTime }}>
      <Text style={[styles.text, { ...textProps }]}>{shortestWaitingTime}</Text>
      <Text style={[styles.text, { ...textProps }]}>&ndash;</Text>
      <Text style={[styles.text, { ...textProps }]}>{longestWaitingTime} min</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  estimatedTime: {
    backgroundColor: MyColors.Text_White,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    right: 6,
    bottom: 6,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: MyFonts.Roboto_700Bold,
    color: MyColors.Text_Regular,
    // color: '#1A202C',
  },
});
