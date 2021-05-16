import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MyFonts } from '../../global';

interface HorizontalGridProps {
  category: string;
}

export const HorizontalGrid: React.FC<HorizontalGridProps> = ({ category, children }) => {
  return (
    <View
      style={{
        marginBottom: 20,
        width: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginLeft: 20,
          marginBottom: 2,
          fontFamily: MyFonts.Roboto_400Regular,
        }}
      >
        {category}
      </Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ marginLeft: 20 }}></View>
        {children}
      </ScrollView>
    </View>
  );
};
