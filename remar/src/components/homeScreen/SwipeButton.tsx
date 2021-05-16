import React from 'react';
import { Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SwipeRight } from '../../assets/SwipeRight';
import { MyFonts } from '../../global';

interface SwipeButtonProps {
  title: string;
  handleSwipe: () => Promise<void>;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({ title, handleSwipe }) => {
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
        width: '70%',
        alignSelf: 'center',
      }}
    >
      <Text
        style={{
          position: 'absolute',
          alignSelf: 'center',
          fontSize: 30,
          fontFamily: MyFonts.Roboto_700Bold,
          color: '#fff',
        }}
      >
        {title}
      </Text>
      <Swipeable
        containerStyle={{ marginLeft: 5 }}
        activeOffsetX={20}
        renderLeftActions={leftActions}
        onEnded={() => handleSwipe()}
      >
        <SwipeRight />
      </Swipeable>
    </View>
  );
};
