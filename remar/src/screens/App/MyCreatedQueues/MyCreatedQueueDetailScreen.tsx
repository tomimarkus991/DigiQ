import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GetPeopleOnTheQueueDocument,
  useDeleteQueueMutation,
  useGetPeopleOnTheQueueQuery,
  useGetQueueQuery,
  useRemoveUserFromQueueMutation,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';

// @todo make this style better
export const MyCreatedQueueDetailScreen = ({
  route,
  navigation,
}: MyCreatedQueuesNavProps<'MyCreatedQueue'>) => {
  const id = route.params.id;
  const { data } = useGetQueueQuery({
    variables: { id },
    pollInterval: 500,
    fetchPolicy: 'no-cache',
  });

  const [deleteQueue] = useDeleteQueueMutation({
    onCompleted: () => navigation.navigate('MyCreatedQueues'),
    fetchPolicy: 'no-cache',
  });
  const {
    data: peopleData,
    refetch,
    networkStatus,
  } = useGetPeopleOnTheQueueQuery({
    variables: { id },
    pollInterval: 1000,
    fetchPolicy: 'network-only',
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
    fetchPolicy: 'no-cache',
  });

  let renderItem = (itemData: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text
              style={{
                fontFamily: MyFonts.Roboto_500Medium,
                fontSize: 18,
                color: MyColors.Text_Regular,
              }}
            >
              {itemData.item.user.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              removeUserFromQueue({
                variables: {
                  removeUserFromQueueInput: {
                    queueId: id,
                    userId: itemData.item.user.id,
                  },
                },
              })
            }
            style={{
              alignSelf: 'flex-end',
              marginRight: 10,
              justifyContent: 'center',
              flex: 0.2,
            }}
          >
            <MaterialIcons name="delete" size={42} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // const { data: subscriptionData } = useJoinQueueSubSubscription({
  //   variables: { id },
  //   onSubscriptionData: () => {
  //     setQueueData(subscriptionData?.joinQueueSub);
  //   },
  // });

  return (
    <View style={styles.main}>
      <View style={styles.main}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.main}
            source={{
              uri: data?.queue.imageUri,
            }}
          />
        </View>
        <View style={styles.secondHalf}>
          <TouchableOpacity
            onPress={() =>
              deleteQueue({
                variables: { id },
                update: cache => {
                  cache.evict({ id: 'Queue:' + id });
                  // cache.gc();
                },
              })
            }
            style={{ alignSelf: 'flex-end', marginRight: 10 }}
          >
            <MaterialIcons name="delete" size={42} color="red" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {(data?.queue.name.substring(0, 1).toUpperCase() as string) +
              data?.queue.name.substring(1, data?.queue.name.length)}
          </Text>
          <View
            style={{
              flex: 4,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.fatText, { marginBottom: 10 }]}>
                Inimesi järjekorras
              </Text>
              <View style={styles.circle}>
                <Text style={styles.fatText}>{data?.queue.waiting}</Text>
              </View>
            </View>
            <FlatList
              style={{ marginLeft: 25, flex: 1 }}
              refreshing={networkStatus === 4}
              onRefresh={() => refetch()}
              data={peopleData?.queue.onQueue}
              horizontal={false}
              numColumns={1}
              renderItem={renderItem}
              keyExtractor={index => index.user.id.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: MyColors.Background_White,
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
