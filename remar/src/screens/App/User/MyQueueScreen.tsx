import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { WaitTime } from '../../../components/homeScreen/WaitTime';
import { useGetQueueQuery } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { MyQueuesNavProps } from '../../../types/MyQueuesParamList';

export const MyQueueScreen = ({ route }: MyQueuesNavProps<'MyQueue'>) => {
  const id = route.params.id;

  const { data, error } = useGetQueueQuery({ variables: { id } });
  return (
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
          <Text style={[styles.fatText, { marginBottom: 10 }]}>Inimesi järjekorras</Text>
          <View style={styles.circle}>
            <Text style={styles.fatText}>{data?.queue.waiting}</Text>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>
      </View>
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
