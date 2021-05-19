import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DetailScreenContent } from '../../../components/homeScreen/DetailScreenContent';
import {
  useGetQueueQuery,
  useJoinQueueSubSubscription,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

export const QueueDetailScreen = ({ route, navigation }: HomeNavProps<'QueueDetail'>) => {
  const id = route.params.id;

  const { data } = useGetQueueQuery({ variables: { id } });
  const { data: newData } = useJoinQueueSubSubscription({ variables: { id } });
  let navigate = () => {
    navigation.navigate('MyQueuesTab', {
      screen: 'MyQueue',
      params: { id, newData },
      initial: false,
    });
  };

  return (
    <View style={styles.main}>
      {newData?.joinQueueSub ? (
        <DetailScreenContent data={newData?.joinQueueSub} id={id} navigate={navigate} />
      ) : (
        <DetailScreenContent data={data?.queue} id={id} navigate={navigate} />
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
  icon: {
    marginLeft: 2,
    alignSelf: 'center',
  },
});
