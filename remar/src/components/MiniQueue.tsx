import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fonts } from '../global';
import { HomeParamList } from '../types/HomeParamList';

interface MiniQueueProps {
  data: any;
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

export const MiniQueue: React.FC<MiniQueueProps> = ({ data, navigation }) => {
  const { name, shortestWaitingTime, longestWaitingTime, id } = data;

  const seeTheLine = () => {
    navigation.navigate('Line', { id });
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
      <TouchableOpacity onPress={() => seeTheLine()}>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ width: 170, height: 150, borderRadius: 15 }}
            source={{
              uri: 'https://via.placeholder.com/300/09f/432.png',
            }}
          />

          <View style={{ ...styles.estimatedTime }}>
            <Text
              style={{
                ...styles.text,
              }}
            >
              {shortestWaitingTime}
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              &ndash;
            </Text>
            <Text
              style={{
                ...styles.text,
              }}
            >
              {longestWaitingTime} min
            </Text>
          </View>
          <View style={{ ...styles.name }}>
            <Text
              style={{
                fontSize: 17,
                color: '#1A202C',
                fontFamily: Fonts.Roboto_700Bold,
              }}
            >
              {name}
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
    fontFamily: Fonts.Roboto_700Bold,
    color: '#1A202C',
  },
});
