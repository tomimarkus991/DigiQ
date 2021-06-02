import React, { useEffect, useRef } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WaitTimeBig } from '../../../components/homeScreen/WaitTimeBig';
import {
  useGetQueueQuery,
  useJoinQueueMutation,
  usePositionInQueueQuery,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyQueuesNavProps } from '../../../types/MyQueuesParamList';
import LottieView from 'lottie-react-native';

export const MyQueueDetailScreen = ({
  route,
  navigation,
}: MyQueuesNavProps<'MyQueue'>) => {
  const id = route.params.id;
  const { data } = useGetQueueQuery({
    variables: { id },
    fetchPolicy: 'network-only',
    pollInterval: 500,
    onError: err => console.log(err),
  });

  const { data: myPositionInQueue } = usePositionInQueueQuery({
    variables: { queueId: id },
    fetchPolicy: 'network-only',
    pollInterval: 500,
  });

  const animation1 = useRef(null);

  useEffect(() => {
    animation1.current.play();
  }, []);
  // const { data: subscriptionData } = useJoinQueueSubSubscription({
  //   variables: { id },
  //   onSubscriptionData: () => {
  //     setQueueData(subscriptionData?.joinQueueSub);
  //   },
  // });

  const [joinQueue] = useJoinQueueMutation({
    onCompleted: () => {
      navigation.navigate('MyQueues');
    },
    onError: err => {
      console.log(err);
    },
  });

  const joinTheQueue = async () => {
    await joinQueue({
      variables: { joinQueueInput: { queueId: id, value: -1 } },
      update: cache => {
        cache.evict({ id: 'Queue:' + id });
        cache.gc();
      },
    });
  };

  return (
    <View style={styles.main}>
      <Image
        style={styles.image}
        source={{
          uri: data?.queue.imageUri,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <View style={styles.animationContainer}>
          <LottieView
            ref={animation => {
              animation1.current = animation;
            }}
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#fff',
            }}
            source={require('../../../assets/fly.json')}
          />
        </View>
        <Text style={styles.headerText}>
          {(data?.queue.name.substring(0, 1).toUpperCase() as string) +
            data?.queue.name.substring(1, data?.queue.name.length)}
        </Text>
        <View
          style={{
            flex: 4,
          }}
        >
          <View style={{ flexDirection: 'row', flex: 2 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.fatText, { marginBottom: 10 }]}>
                Pikkus
              </Text>
              <View style={styles.circle}>
                <Text style={[styles.fatText, { fontSize: 28 }]}>
                  {data?.queue.waiting}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.fatText, { marginBottom: 10 }]}>
                Minu koht
              </Text>
              <View style={styles.circle}>
                <Text style={[styles.fatText, { fontSize: 28 }]}>
                  {myPositionInQueue?.positionInQueue}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <WaitTimeBig
              shortestWaitingTime={
                (data?.queue.estimatedServingtime as number) *
                (myPositionInQueue?.positionInQueue as number)
              }
              longestWaitingTime={
                (data?.queue.estimatedServingtime as number) *
                  (myPositionInQueue?.positionInQueue as number) +
                (data?.queue.estimatedServingtime as number)
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => joinTheQueue()}
              style={styles.badButton}
            >
              <Text style={styles.submitText}>Lahku</Text>
            </TouchableOpacity>
            {myPositionInQueue?.positionInQueue === 1 ? (
              <TouchableOpacity
                onPress={() => joinTheQueue()}
                style={{ ...styles.niceButton, marginRight: 10 }}
              >
                <Text style={styles.submitText}>Olen kohal</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: MyColors.Background_White,
  },
  image: {
    flex: 6,
    maxHeight: 200,
    backgroundColor: MyColors.Nice_Blue,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: MyColors.Button_Blue,
    height: 70,
    width: 70,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  fatText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 24,
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
    marginVertical: 10,
    flex: 1.2,
  },
  badButton: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: MyColors.Button_Red,
    minHeight: 50,
    maxHeight: 50,
  },
  niceButton: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: MyColors.Button_Green,
    minHeight: 50,
    maxHeight: 50,
  },
  submitText: {
    fontSize: 24,
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_White,
  },
});
