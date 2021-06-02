import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QueueCard } from '../../../components/homeScreen/QueueCard';
import { useMeQuery, useQueuesQuery } from '../../../generated/graphql';
import { MyFonts, MyColors } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

export const HomeScreen = ({ navigation }: HomeNavProps<'Feed'>) => {
  const { data, error, refetch, networkStatus } = useQueuesQuery({
    fetchPolicy: 'network-only',
    pollInterval: 500,
  });

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Text>{error.message}</Text>
      </View>
    );
  }
  let renderItem = (data: any) => {
    return (
      <QueueCard
        data={data.item}
        navigation={() =>
          navigation?.navigate('QueueDetail', { id: data.item.id })
        }
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: MyColors.Background_White,
      }}
    >
      <View
        style={{
          flex: 0.08,
          flexDirection: 'row',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Header,
            fontSize: 32,
            marginLeft: 20,
            marginRight: 'auto',
          }}
        >
          Kodu
        </Text>
      </View>
      <FlatList
        style={{ marginLeft: 25, flex: 1 }}
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        data={data?.queues}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};
