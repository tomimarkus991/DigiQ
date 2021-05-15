import React from 'react';
import { Text, View } from 'react-native';
import { Colors, Fonts } from '../../global';

interface AuthHeaderProps {}

export const AuthHeader: React.FC<AuthHeaderProps> = ({}) => {
  return (
    <View style={{ flex: 3, justifyContent: 'center' }}>
      <Text
        style={{
          fontFamily: Fonts.Roboto_700Bold,
          fontSize: 48,
          textAlign: 'center',
          color: Colors.Text_Header,
        }}
      >
        Digi Q
      </Text>
    </View>
  );
};
