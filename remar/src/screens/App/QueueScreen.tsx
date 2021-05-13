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

export const LineScreen = ({ navigation, route }: HomeStackNavProps<'Line'>) => {
  const { id } = route.params.data;
  const [joinQueue] = useJoinQueueMutation();
  const { data } = useGetQueueQuery({ variables: { id } });
  const { loading, data: newData, error } = useJoinQueueSubSubscription();
  console.log('neww', newData?.joinQueueSub);
  // const leaveTheLine = () => {
  //   navigation.navigate("Feed");
  //   console.log("leaveTheLine");
  // };
  const joinTheLine = async () => {
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
          <Text>Inimesi järjekorras: {data?.queue.waiting}</Text>
          <Text>Minimaalne ootamisaeg on: {data?.queue.shortestWaitingTime} min</Text>
          <Text>Maximaalne ootamisaeg on: {data?.queue.longestWaitingTime} min</Text>
        </View>
      )}

      <CustomButton title="Ühine järjekorraga" onPress={() => joinTheLine()} />
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
