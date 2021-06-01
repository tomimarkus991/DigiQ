import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyQueueScreenContent } from '../../../components/myQueueScreen/UserRole/MyQueueScreenContent';
import {
  useGetQueueQuery,
  useJoinQueueSubSubscription,
} from '../../../generated/graphql';
import { MyColors } from '../../../global';
import { MyQueuesNavProps } from '../../../types/MyQueuesParamList';

export const MyQueueDetailScreen = ({
  route,
  navigation,
}: MyQueuesNavProps<'MyQueue'>) => {
  const id = route.params.id;
  const [queueData, setQueueData] = useState<any>();
  const { data } = useGetQueueQuery({
    variables: { id },
    onCompleted: () => {
      setQueueData(data?.queue);
    },
    fetchPolicy: 'network-only',

    onError: err => console.log(err),
  });

  const { data: subscriptionData } = useJoinQueueSubSubscription({
    variables: { id },
    onSubscriptionData: () => {
      setQueueData(subscriptionData?.joinQueueSub);
    },
  });

  return (
    <View style={styles.main}>
      <MyQueueScreenContent
        data={queueData}
        id={id}
        navigateBack={() => navigation.navigate('MyQueues')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: MyColors.Background_White,
  },
});
