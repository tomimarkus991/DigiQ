import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as CustomButton } from '../../components/custom/Button';

import { HomeStackNavProps } from '../../types/HomeParamList';

export const LineScreen = ({ navigation, route }: HomeStackNavProps<'Line'>) => {
  const { id } = route.params.data;
  let data: any;
  // const leaveTheLine = () => {
  //   navigation.navigate("Feed");
  //   console.log("leaveTheLine");
  // };
  const joinTheLine = async () => {
    // const response = await addUser({ variables: { id } });

    navigation.navigate('JoinedLine', {
      currentQueueName: route.params.queueName,
      data: route.params.data,
    });
  };

  // const imHere = () => {
  //   console.log("here");
  // };
  return (
    <View style={styles.main}>
      <Text>Inimesi järjekorras: {data?.queue.peopleInQueue}</Text>
      <Text>Minimaalne ootamisaeg on: {data?.queue.shortestWaitingTime} min</Text>
      <Text>Maximaalne ootamisaeg on: {data?.queue.longestWaitingTime} min</Text>
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
