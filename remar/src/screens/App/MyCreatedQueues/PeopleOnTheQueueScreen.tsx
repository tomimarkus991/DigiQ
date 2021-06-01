import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GetPeopleOnTheQueueDocument,
  useGetPeopleOnTheQueueQuery,
  useRemoveUserFromQueueMutation,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';

export const PeopleOnTheQueueScreen = ({
  route,
}: MyCreatedQueuesNavProps<'PeopleOnTheQueue'>) => {
  const id = route.params.id;

  const { data, refetch, networkStatus } = useGetPeopleOnTheQueueQuery({
    variables: { id },
  });
  const [removeUserFromQueue] = useRemoveUserFromQueueMutation({
    refetchQueries: [
      {
        query: GetPeopleOnTheQueueDocument,
        variables: {
          id,
        },
      },
    ],
  });

  let renderItem = (data: any) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            fontSize: 18,
            color: MyColors.Text_Regular,
          }}
        >
          {data.item.user.username}
        </Text>
        <TouchableOpacity
          onPress={
            () =>
              removeUserFromQueue({
                variables: {
                  removeUserFromQueueInput: {
                    queueId: id,
                    userId: data.item.user.id,
                  },
                },
              })
            // deleteQueue({
            //   variables: { id },
            // update: cache => {
            //   cache.evict({ id: 'Queue:' + id });
            //   cache.gc();
            // },
            // })
          }
          style={{ alignSelf: 'flex-end', marginRight: 10 }}
        >
          <MaterialIcons name="delete" size={42} color="red" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={{ flex: 0.7 }}>
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
            horizontal={false}
            numColumns={1}
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
