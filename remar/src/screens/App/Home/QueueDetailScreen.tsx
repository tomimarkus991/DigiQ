import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/custom/Button';
import { SwipeButton } from '../../../components/homeScreen/SwipeButton';
import { WaitTimeBig } from '../../../components/homeScreen/WaitTimeBig';
import {
  useGetQueueQuery,
  useHasUserJoinedThisQueueQuery,
  useJoinQueueMutation,
  useMeQuery,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

// @todo maybe make this components style as good as MyQueueDetailScreen
export const QueueDetailScreen = ({
  route,
  navigation,
}: HomeNavProps<'QueueDetail'>) => {
  const id = route.params.id;

  const { data } = useGetQueueQuery({
    variables: { id },
    pollInterval: 500,
    fetchPolicy: 'network-only',
  });

  const { data: hasUserJoined } = useHasUserJoinedThisQueueQuery({
    variables: { queueId: id },
    fetchPolicy: 'network-only',
  });
  const { data: me } = useMeQuery();

  const [joinQueue, { error }] = useJoinQueueMutation({
    onCompleted: () => {
      navigation.navigate('MyQueuesTab', {
        screen: 'MyQueue',
        params: { id },
        initial: false,
      });
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'Feed' }],
        });
      }, 2000);
    },
    errorPolicy: 'ignore',
  });

  const joinTheQueue = async () => {
    await joinQueue({
      variables: { joinQueueInput: { queueId: id, value: 1 } },
    });
  };

  // const { data: subscriptionData } = useJoinQueueSubSubscription({
  //   variables: { id },
  //   onSubscriptionComplete: () => {
  //     setQueueData(subscriptionData?.joinQueueSub);
  //   },
  // });

  return (
    <View style={styles.main}>
      <View style={styles.main}>
        <Image
          style={styles.main}
          source={{
            uri: data?.queue.imageUri,
          }}
        />
      </View>
      {/* @todo make this better a new component maybe */}
      {me?.me?.isCreator ? (
        <View style={styles.secondHalf}>
          <Text style={styles.headerText}>
            {(data?.queue.name.substring(0, 1).toUpperCase() as string) +
              data?.queue.name.substring(1, data?.queue.name.length)}
          </Text>
          <View
            style={{
              flex: 4,
            }}
          >
            <Text style={[styles.fatText, { marginBottom: 10 }]}>
              Inimesi järjekorras
            </Text>
            <View style={styles.circle}>
              <Text style={styles.fatText}>{data?.queue.waiting}</Text>
            </View>
            <WaitTimeBig
              shortestWaitingTime={
                data?.queue.shortestWaitingTime as number
              }
              longestWaitingTime={data?.queue.longestWaitingTime as number}
            />
          </View>
        </View>
      ) : (
        <View style={styles.secondHalf}>
          <Text style={styles.headerText}>
            {(data?.queue.name.substring(0, 1).toUpperCase() as string) +
              data?.queue.name.substring(1, data?.queue.name.length)}
          </Text>
          <View
            style={{
              flex: 4,
            }}
          >
            <Text style={[styles.fatText, { marginBottom: 10 }]}>
              Inimesi järjekorras
            </Text>
            <View style={styles.circle}>
              <Text style={styles.fatText}>{data?.queue.waiting}</Text>
            </View>
            <WaitTimeBig
              shortestWaitingTime={
                data?.queue.shortestWaitingTime as number
              }
              longestWaitingTime={data?.queue.longestWaitingTime as number}
            />
          </View>
          {hasUserJoined?.hasUserJoinedThisQueue ? (
            <View style={{ flex: 2 }}>
              <Text style={styles.errorText}>{error?.message}</Text>
              <Button
                title="Vaata seda"
                onPress={() => {
                  navigation.navigate('MyQueuesTab', {
                    screen: 'MyQueue',
                    params: { id },
                    initial: false,
                  });
                  setTimeout(() => {
                    navigation.reset({
                      routes: [{ name: 'Feed' }],
                    });
                  }, 2000);
                }}
              />
            </View>
          ) : (
            <View style={{ flex: 2 }}>
              <Text style={styles.errorText}>{error?.message}</Text>
              <SwipeButton title="Ühine" handleSwipe={joinTheQueue} />
            </View>
          )}
        </View>
      )}
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
  icon: {
    marginLeft: 2,
    alignSelf: 'center',
  },
});
