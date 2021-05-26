import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyColors, MyFonts } from '../../global';
import { WaitingOnTheQueue } from './WaitingOnTheQueue';
import { WaitTime } from './WaitTime';

interface QueueCardContentProps {
  data: any;
  navigation: () => void;
}

export const QueueCardContent: React.FC<QueueCardContentProps> = ({
  data,
  navigation,
}) => {
  const {
    name,
    shortestWaitingTime,
    longestWaitingTime,
    id,
    waiting,
    imageUri,
  } = data;
  return (
    <View
      style={{
        flex: 1,
        marginRight: 20,
        marginBottom: 20,
        minWidth: 20,
        width: 170,
        maxWidth: 170,
      }}
    >
      <TouchableOpacity onPress={navigation}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ width: 170, height: 150, borderRadius: 15 }}
            source={{
              uri: imageUri,
            }}
          />
          <WaitingOnTheQueue waiting={waiting} />
          <WaitTime
            shortestWaitingTime={shortestWaitingTime}
            longestWaitingTime={longestWaitingTime}
          />
          <View style={{ ...styles.name }}>
            <Text
              style={{
                fontSize: 17,
                color: MyColors.Text_Dark,
                fontFamily: MyFonts.Roboto_700Bold,
              }}
            >
              {name.substring(0, 1).toUpperCase() +
                name.substring(1, name.length)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  estimatedTime: {
    backgroundColor: 'white',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    right: 2,
    bottom: 2,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  name: {
    position: 'absolute',
    left: 2,
    top: 2,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
