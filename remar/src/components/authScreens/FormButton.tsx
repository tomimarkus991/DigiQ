import { AntDesign } from '@expo/vector-icons';
import React, { DragEvent } from 'react';
import { Animated, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SwipeRight } from '../../assets/SwipeRight';
import { Colors, Fonts } from '../../global';

interface FormButtonProps {
  title: string;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const FormButton: React.FC<FormButtonProps> = ({ title, handleSubmit }) => {
  const leftActions = () => {
    return (
      <>
        <Text>&nbsp;</Text>
      </>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#3330CB',
        height: 65,
        justifyContent: 'center',
        borderRadius: 30,
      }}
    >
      <Text
        style={{
          position: 'absolute',
          alignSelf: 'center',
          fontSize: 30,
          fontFamily: Fonts.Roboto_700Bold,
          color: '#fff',
        }}
      >
        {title}
      </Text>
      <Swipeable
        containerStyle={{ marginLeft: 5 }}
        activeOffsetX={20}
        renderLeftActions={leftActions}
        onEnded={() => handleSubmit()}
      >
        <SwipeRight />
      </Swipeable>
    </View>
  );
};
