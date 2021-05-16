import { Entypo } from '@expo/vector-icons';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Button as CustomButton } from '../../../components/custom/Button';
import { SwipeButton } from '../../../components/homeScreen/SwipeButton';
import { WaitTime } from '../../../components/homeScreen/WaitTime';
import {
  useGetQueueQuery,
  useJoinQueueMutation,
  useJoinQueueSubSubscription,
} from '../../../generated/graphql';
import { MyFonts, MyColors } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

export const QueueDetailScreen = ({ route, navigation }: HomeNavProps<'QueueDetail'>) => {
  const id = route.params.id;

  const [joinQueue, { error }] = useJoinQueueMutation({
    onCompleted: () => {
      navigation.navigate('User', {
        screen: 'MyQueue',
        params: { id },
        initial: false,
      });
    },
    onError: err => {
      console.log(err);
    },
  });
  const { data } = useGetQueueQuery({ variables: { id } });
  const { data: newData } = useJoinQueueSubSubscription();

  const joinTheQueue = async () => {
    await joinQueue({
      variables: { joinQueueInput: { queueId: id, value: 1 } },
    });
  };
  return (
    <View style={styles.main}>
      {newData?.joinQueueSub ? (
        <View style={styles.main}>
          <View style={styles.main}>
            <Image
              style={styles.main}
              source={{
                uri: 'https://via.placeholder.com/300/09f/432.png',
              }}
            />
            <WaitTime
              shortestWaitingTime={newData?.joinQueueSub.shortestWaitingTime as number}
              longestWaitingTime={newData?.joinQueueSub.longestWaitingTime as number}
              textProps={{ fontSize: 24 }}
            />
          </View>
          <View style={styles.secondHalf}>
            <Text style={styles.headerText}>
              {(newData?.joinQueueSub.name.substring(0, 1).toUpperCase() as string) +
                newData?.joinQueueSub.name.substring(
                  1,
                  newData?.joinQueueSub.name.length,
                )}
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
                <Text style={styles.fatText}>{newData?.joinQueueSub.waiting}</Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.errorText}>{error?.message}</Text>
              <SwipeButton title="Ühine" handleSwipe={joinTheQueue} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.main}>
          <View style={styles.main}>
            <Image
              style={styles.main}
              source={{
                uri: 'https://via.placeholder.com/300/09f/432.png',
              }}
            />
            <WaitTime
              shortestWaitingTime={data?.queue.shortestWaitingTime as number}
              longestWaitingTime={data?.queue.longestWaitingTime as number}
              textProps={{ fontSize: 24 }}
            />
          </View>
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
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.errorText}>{error?.message}</Text>
              <SwipeButton title="Ühine" handleSwipe={joinTheQueue} />
            </View>
          </View>
        </View>
      )}
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
});
