import React from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { SmallQueue } from '../../../components/homeScreen/SmallQueue';
import { useQueuesQuery } from '../../../generated/graphql';
import { MyFonts, MyColors } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

interface HomeScreenProps {}

export const HomeScreen = ({ navigation }: HomeNavProps<'Feed'>) => {
  const { data, error } = useQueuesQuery();

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }
  let renderItem = (data: any) => {
    return <SmallQueue data={data.item} navigation={navigation} />;
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <Text
        style={{
          fontFamily: MyFonts.Roboto_500Medium,
          color: MyColors.Text_Header,
          fontSize: 32,
          marginBottom: 20,
          marginLeft: 20,
        }}
      >
        Home
      </Text>
      <FlatList
        style={{ marginLeft: 20 }}
        data={data?.queues}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};
