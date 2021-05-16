import React from 'react';
import { Text, View } from 'react-native';
import { MyColors, MyFonts } from '../../global';

interface AuthHeaderProps {}

export const AuthHeader: React.FC<AuthHeaderProps> = ({}) => {
  return (
    <View style={{ flex: 3, justifyContent: 'center' }}>
      <Text
        style={{
          fontFamily: MyFonts.Roboto_700Bold,
          fontSize: 48,
          textAlign: 'center',
          color: MyColors.Text_Header,
        }}
      >
        Digi Q
      </Text>
    </View>
  );
};
