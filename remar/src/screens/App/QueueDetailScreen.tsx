import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as CustomButton } from '../../components/custom/Button';
import {
  useGetQueueQuery,
  useJoinQueueMutation,
  useJoinQueueSubSubscription,
} from '../../generated/graphql';

import { HomeStackNavProps } from '../../types/HomeParamList';

export const QueueDetailScreen = ({ route }: HomeStackNavProps<'Queue'>) => {
  const id = route.params.id;
  const [joinQueue] = useJoinQueueMutation();
  const { data } = useGetQueueQuery({ variables: { id } });
  const { data: newData } = useJoinQueueSubSubscription();

  // const leaveTheLine = () => {
  //   navigation.navigate("Feed");
  //   console.log("leaveTheLine");
  // };
  const joinTheQueue = async () => {
    const response = await joinQueue({
      variables: { joinQueueInput: { queueId: id, value: 1 } },
    });

    // navigation.navigate('JoinedLine', {
    //   currentQueueName: route.params.queueName,
    //   data: route.params.data,
    // });
  };

  // const imHere = () => {
  //   console.log("here");
  // };
  return (
    <View style={styles.main}>
      {newData?.joinQueueSub ? (
        <View>
          <Text>{newData?.joinQueueSub.name}</Text>
          <Text>Inimesi järjekorras: {newData?.joinQueueSub.waiting}</Text>
          <Text>
            Minimaalne ootamisaeg on: {newData?.joinQueueSub.shortestWaitingTime} min
          </Text>
          <Text>
            Maximaalne ootamisaeg on: {newData?.joinQueueSub.longestWaitingTime} min
          </Text>
        </View>
      ) : (
        <View>
          <Text>{data?.queue.name}</Text>
          <Text>Inimesi järjekorras: {data?.queue.waiting}</Text>
          <Text>Minimaalne ootamisaeg on: {data?.queue.shortestWaitingTime} min</Text>
          <Text>Maximaalne ootamisaeg on: {data?.queue.longestWaitingTime} min</Text>
        </View>
      )}

      <CustomButton title="Ühine järjekorraga" onPress={() => joinTheQueue()} />
      {/* <CustomButton title="Olen kohal" onPress={() => imHere()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
