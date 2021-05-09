import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { HomeParamList } from '../../types/HomeParamList';
import { MiniQueue } from '../MiniQueue';

interface SectionListProps {
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

export const SectionList: React.FC<SectionListProps> = ({ navigation }) => {
  let renderItem = (data: any) => {
    return <MiniQueue data={data.item} navigation={navigation} />;
  };

  return (
    <>
      {/* <FlatList
        style={{ marginLeft: 20 }}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
      /> */}
    </>
  );
};
