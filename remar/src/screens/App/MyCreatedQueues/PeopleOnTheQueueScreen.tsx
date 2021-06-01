import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useGetPeopleOnTheQueueQuery } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';

export const PeopleOnTheQueueScreen = ({
  route,
}: MyCreatedQueuesNavProps<'PeopleOnTheQueue'>) => {
  const id = route.params.id;

  const { data, refetch, networkStatus } = useGetPeopleOnTheQueueQuery({
    variables: { id },
  });

  let renderItem = (data: any) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>{data.item.user.username}</Text>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={{ flex: 0.5 }}>
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Header,
            fontSize: 32,
            marginLeft: 60,
            paddingTop: (StatusBar.currentHeight as number) + 20,
          }}
        >
          {data?.queue.name} järjekord
        </Text>
      </View>
      <View style={styles.secondHalf}>
        <View
          style={{
            flex: 4,
          }}
        >
          <FlatList
            style={{ marginLeft: 25, flex: 1 }}
            refreshing={networkStatus === 4}
            onRefresh={() => refetch()}
            data={data?.queue.onQueue}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={index => index.user.id.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  circle: {
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: MyColors.Button_Blue,
    height: 100,
    width: 100,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  fatText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 36,
    color: MyColors.Text_Header,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 16,
    color: MyColors.Text_Error,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 36,
    color: MyColors.Text_Header,
    flex: 1,
  },
  secondHalf: {
    flex: 3,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  submitButton: {
    flex: 0.5,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: MyColors.Nice_Blue,
    width: '70%',
    alignSelf: 'center',
  },
  submitText: {
    fontSize: 24,
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_White,
  },
});
