import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList } from 'react-native';
import { Queue } from '../../generated/graphql';
import { HomeParamList } from '../../types/HomeParamList';
import { SmallQueue } from '../homeScreen/SmallQueue';

interface SectionListProps {
  data: Queue[];
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

export const SectionList: React.FC<SectionListProps> = ({ data, navigation }) => {
  let renderItem = (data: any) => {
    return <SmallQueue data={data.item} navigation={navigation} />;
  };

  return (
    <>
      <FlatList
        style={{ marginLeft: 20 }}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
      />
    </>
  );
};
