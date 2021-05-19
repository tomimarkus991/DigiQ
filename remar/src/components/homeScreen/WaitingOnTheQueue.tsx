import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MyFonts, MyColors } from '../../global';

interface WaitingOnTheQueueProps {
  waiting: number;
  textProps?: any;
}

export const WaitingOnTheQueue: React.FC<WaitingOnTheQueueProps> = ({
  waiting,
  textProps,
}) => {
  return (
    <View style={{ ...styles.waiting }}>
      <Text style={[styles.text, { ...textProps }]}>{waiting}</Text>
      <MaterialCommunityIcons
        style={[styles.icon, { ...textProps }]}
        name="human-greeting"
        color={MyColors.Text_Regular}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  waiting: {
    backgroundColor: MyColors.Text_White,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    left: 6,
    bottom: 6,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: MyFonts.Roboto_700Bold,
    color: MyColors.Text_Regular,
  },
  icon: {
    fontSize: 14,
    marginLeft: 2,
    alignSelf: 'center',
  },
});
