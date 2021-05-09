import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { SectionList as CustomSectionList } from '../../components/custom/SectionList';
import { HomeStackNavProps } from '../../types/HomeParamList';

interface HomeScreenProps {}

export const HomeScreen = ({ navigation }: HomeStackNavProps<'Feed'>) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Text
        style={{
          // fontFamily: 'Roboto_500Medium',
          fontSize: 24,
          marginBottom: 2,
          marginLeft: 20,
        }}
      >
        Home
      </Text>
      {/* <CustomSectionList data={data?.queues} navigation={navigation} /> */}
    </SafeAreaView>
  );
};
