import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { QueueCard } from '../../../components/homeScreen/QueueCard';
import { useGetMyQueuesQuery } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyQueuesNavProps } from '../../../types/MyQueuesParamList';

export const MyQueuesScreen = ({
  navigation,
}: MyQueuesNavProps<'MyQueues'>) => {
  const { data, refetch, networkStatus } = useGetMyQueuesQuery();

  let renderItem = (data: any) => {
    const { id } = data.item.queue;
    return (
      <View>
        <QueueCard
          data={data.item.queue}
          navigation={() => navigation.navigate('MyQueue', { id })}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: (StatusBar.currentHeight as number) + 20,
        backgroundColor: MyColors.Background_White,
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
        My Queues
      </Text>
      <FlatList
        style={{ marginLeft: 20 }}
        data={data?.getMyQueues}
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};
