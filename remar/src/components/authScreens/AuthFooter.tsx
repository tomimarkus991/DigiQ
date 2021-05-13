import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Colors, Fonts } from '../../global';

interface AuthFooterProps {
  text: string;
  whereTo: any;
  buttonTitle: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ text, whereTo, buttonTitle }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '85%',
        alignItems: 'baseline',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Text
        style={{
          color: Colors.Text_Gray,
          fontSize: 18,
          textAlign: 'center',
          fontFamily: Fonts.Roboto_500Medium,
          marginRight: 6,
        }}
      >
        {text}
      </Text>
      <TouchableOpacity onPress={whereTo}>
        <View
          style={{
            backgroundColor: Colors.Button_Purple,
            marginTop: 10,
            marginVertical: 60,
            padding: 10,
            borderRadius: 10,
            width: 80,
          }}
        >
          <Text
            style={{
              color: Colors.Text_Regular,
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {buttonTitle}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
