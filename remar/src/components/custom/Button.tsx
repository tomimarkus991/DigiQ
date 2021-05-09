import React from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: '#3182CE',
          marginTop: 10,
          marginVertical: 60,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: '#E2E8F0', fontSize: 24, textAlign: 'center' }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
