import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyCreatedQueueScreenContent } from '../../../components/myQueueScreen/CreatorRole/MyCreatedQueueScreenContent';
import {
  useGetQueueQuery,
  useJoinQueueSubSubscription,
} from '../../../generated/graphql';
import { MyColors } from '../../../global';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';

export const MyCreatedQueueDetailScreen = ({
  route,
  navigation,
}: MyCreatedQueuesNavProps<'MyCreatedQueue'>) => {
  const id = route.params.id;
  const [queueData, setQueueData] = useState<any>();
  const { data } = useGetQueueQuery({
    variables: { id },
    onCompleted: () => {
      setQueueData(data?.queue);
    },
    fetchPolicy: 'network-only',
  });
  const { data: subscriptionData } = useJoinQueueSubSubscription({
    variables: { id },
    onSubscriptionData: () => {
      setQueueData(subscriptionData?.joinQueueSub);
    },
  });

  return (
    <View style={styles.main}>
      <MyCreatedQueueScreenContent
        data={queueData}
        navigateToQueueScreen={() =>
          navigation.navigate('PeopleOnTheQueue', { id })
        }
        navigateBack={() => navigation.navigate('MyCreatedQueues')}
        id={id}
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
