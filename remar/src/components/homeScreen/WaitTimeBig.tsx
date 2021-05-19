import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MyFonts, MyColors } from '../../global';

interface WaitTimeBigProps {
  shortestWaitingTime: number;
  longestWaitingTime: number;
  textProps?: any;
}

export const WaitTimeBig: React.FC<WaitTimeBigProps> = ({
  shortestWaitingTime,
  longestWaitingTime,
  textProps,
}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.regularText}>Ooteaeg</Text>
      <View style={styles.estimatedTime}>
        <Text style={styles.text}>{shortestWaitingTime}</Text>
        <Text style={styles.text}>&ndash;</Text>
        <Text style={styles.text}>{longestWaitingTime} min</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  estimatedTime: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  regularText: {
    fontSize: 36,
    fontFamily: MyFonts.Roboto_700Bold,
    color: MyColors.Text_Regular,
  },
  text: {
    fontSize: 24,
    fontFamily: MyFonts.Roboto_700Bold,
    color: MyColors.Text_Regular,
  },
});
