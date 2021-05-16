import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Queue } from '../../generated/graphql';
import { MyColors, MyFonts } from '../../global';
import { HomeParamList } from '../../types/HomeParamList';
import { WaitTime } from './WaitTime';

interface SmallQueueProps {
  data: Queue;
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

export const SmallQueue: React.FC<SmallQueueProps> = ({ data, navigation }) => {
  const { name, shortestWaitingTime, longestWaitingTime, id } = data;

  const seeTheQueue = () => {
    navigation.navigate('QueueDetail', { id });
  };
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
      <TouchableOpacity onPress={() => seeTheQueue()}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ width: 170, height: 150, borderRadius: 15 }}
            source={{
              uri: 'https://via.placeholder.com/300/09f/432.png',
            }}
          />

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
              {name.substring(0, 1).toUpperCase() + name.substring(1, name.length)}
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
  text: {
    // fontSize: 14,
    fontFamily: MyFonts.Roboto_700Bold,
    color: '#1A202C',
  },
});
