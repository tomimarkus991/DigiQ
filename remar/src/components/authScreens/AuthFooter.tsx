import React from 'react';
import { View, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { MyColors, MyFonts } from '../../global';

interface AuthFooterProps {
  text: string;
  whereTo: any;
  buttonTitle: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ text, whereTo, buttonTitle }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Text
        style={{
          color: MyColors.Text_Gray,
          fontSize: 18,
          textAlign: 'center',
          fontFamily: MyFonts.Roboto_500Medium,
          marginRight: 10,
        }}
      >
        {text}
      </Text>
      <TouchableOpacity onPress={whereTo}>
        <View
          style={{
            backgroundColor: MyColors.Button_Purple,
            marginTop: 10,
            marginVertical: 60,
            padding: 10,
            borderRadius: 10,
            width: 80,
          }}
        >
          <Text
            style={{
              color: MyColors.Text_White,
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
