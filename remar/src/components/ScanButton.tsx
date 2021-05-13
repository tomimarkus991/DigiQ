import React from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../global';

interface ScanButtonProps {
  title: string;
  handlePress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const ScanButton: React.FC<ScanButtonProps> = ({ title, handlePress }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            backgroundColor: Colors.Button_Blue,
            marginTop: 10,
            marginVertical: 60,
            padding: 10,
            borderRadius: 10,
            width: 100,
          }}
        >
          <Text
            style={{
              color: Colors.Text_Regular,
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
