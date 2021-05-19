import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MyColors, MyFonts } from '../../global';
import { SwipeButton } from '../homeScreen/SwipeButton';
import { WaitingOnTheQueue } from '../homeScreen/WaitingOnTheQueue';
import { WaitTime } from '../homeScreen/WaitTime';
import { WaitTimeBig } from '../homeScreen/WaitTimeBig';

interface MyQueueScreenContentProps {
  data: any;
  id: number;
  navigate?: () => void;
}

export const MyQueueScreenContent: React.FC<MyQueueScreenContentProps> = ({
  data,
  id,
  navigate,
}) => {
  return (
    <View style={styles.main}>
      <View style={styles.main}>
        <Image
          style={styles.main}
          source={{
            uri: 'https://via.placeholder.com/300/09f/432.png',
          }}
        />
      </View>
      <View style={styles.secondHalf}>
        <Text style={styles.headerText}>
          {(data?.name.substring(0, 1).toUpperCase() as string) +
            data?.name.substring(1, data?.name.length)}
        </Text>
        <View
          style={{
            flex: 4,
          }}
        >
          <Text style={[styles.fatText, { marginBottom: 10 }]}>Inimesi järjekorras</Text>
          <View style={styles.circle}>
            <Text style={styles.fatText}>{data?.waiting}</Text>
          </View>
          <WaitTimeBig
            shortestWaitingTime={data?.shortestWaitingTime as number}
            longestWaitingTime={data?.longestWaitingTime as number}
            textProps={{ fontSize: 24 }}
          />
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
