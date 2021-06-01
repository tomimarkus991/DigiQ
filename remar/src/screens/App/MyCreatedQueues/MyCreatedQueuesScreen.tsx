import React from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { QueueCard } from '../../../components/homeScreen/QueueCard';
import {
  useMeAdvancedQuery,
  useMeCreatorQuery,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';

export const MyCreatedQueuesScreen = ({
  navigation,
}: MyCreatedQueuesNavProps<'MyCreatedQueues'>) => {
  const { data, refetch, networkStatus } = useMeCreatorQuery();

  let renderItem = (queueData: any) => {
    return (
      <View>
        <QueueCard
          data={queueData.item}
          navigation={() =>
            navigation.navigate('MyCreatedQueue', {
              id: queueData.item.id,
            })
          }
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
        Minu loodud järjekorrad
      </Text>
      <FlatList
        style={{ marginLeft: 20 }}
        data={data?.me?.createdQueues}
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
