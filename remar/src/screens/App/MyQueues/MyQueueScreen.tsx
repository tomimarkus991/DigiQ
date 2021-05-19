import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MyQueueScreenContent } from '../../../components/myQueueScreen/MyQueueScreenContent';
import {
  useGetQueueQuery,
  useJoinQueueSubSubscription,
} from '../../../generated/graphql';
import { MyQueuesNavProps } from '../../../types/MyQueuesParamList';

export const MyQueueScreen = ({ route }: MyQueuesNavProps<'MyQueue'>) => {
  const id = route.params.id;
  const hyperData = route.params.newData;
  const { data } = useGetQueueQuery({
    variables: { id },
  });
  const { data: newData } = useJoinQueueSubSubscription({ variables: { id } });

  return (
    <View style={styles.main}>
      {newData?.joinQueueSub ? (
        <MyQueueScreenContent data={newData?.joinQueueSub} id={id} />
      ) : (
        <>
          {hyperData?.joinQueueSub ? (
            <MyQueueScreenContent data={hyperData?.joinQueueSub} id={id} />
          ) : (
            <MyQueueScreenContent data={data?.queue} id={id} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
