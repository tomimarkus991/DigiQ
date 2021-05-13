import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../global';

interface FormButtonProps {
  title: string;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const FormButton: React.FC<FormButtonProps> = ({ title, handleSubmit }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={() => handleSubmit()}>
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
