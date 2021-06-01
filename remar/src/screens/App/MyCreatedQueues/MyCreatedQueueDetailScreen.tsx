import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MyCreatedQueueScreenContent } from '../../../components/myQueueScreen/CreatorRole/MyCreatedQueueScreenContent';
import { MyQueueScreenContent } from '../../../components/myQueueScreen/UserRole/MyQueueScreenContent';
import {
  useGetQueueQuery,
  useJoinQueueSubSubscription,
} from '../../../generated/graphql';
import { MyColors } from '../../../global';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';
import { MyQueuesNavProps } from '../../../types/MyQueuesParamList';

export const MyCreatedQueueDetailScreen = ({
  route,
  navigation,
}: MyCreatedQueuesNavProps<'MyCreatedQueue'>) => {
  const id = route.params.id;
  const hyperData = route.params.newData;
  const { data } = useGetQueueQuery({
    variables: { id },
  });
  const { data: newData } = useJoinQueueSubSubscription({
    variables: { id },
  });

  return (
    <View style={styles.main}>
      {newData?.joinQueueSub ? (
        <MyCreatedQueueScreenContent
          data={newData?.joinQueueSub}
          navigateToQueueScreen={() =>
            navigation.navigate('PeopleOnTheQueue', { id })
          }
          navigateBack={() => navigation.navigate('MyCreatedQueues')}
          id={id}
        />
      ) : (
        <>
          {hyperData?.joinQueueSub ? (
            <MyCreatedQueueScreenContent
              data={hyperData?.joinQueueSub}
              navigateToQueueScreen={() =>
                navigation.navigate('PeopleOnTheQueue', { id })
              }
              navigateBack={() => navigation.navigate('MyCreatedQueues')}
              id={id}
            />
          ) : (
            <MyCreatedQueueScreenContent
              data={data?.queue}
              navigateToQueueScreen={() =>
                navigation.navigate('PeopleOnTheQueue', { id })
              }
              navigateBack={() => navigation.navigate('MyCreatedQueues')}
              id={id}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: MyColors.Background_White,
  },
});
