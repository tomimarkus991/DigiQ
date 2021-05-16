import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button as CustomButton } from '../../../components/custom/Button';
import { useMeAdvancedQuery } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { UserNavProps } from '../../../types/UserParamList';

export const MyQueuesScreen = ({ navigation }: UserNavProps<'MyQueues'>) => {
  const { data, error } = useMeAdvancedQuery();

  let renderItem = (data: any) => {
    const { id, name } = data.item.queue;
    return (
      <View>
        <Text>{name}</Text>
        <CustomButton
          title="go to queue"
          onPress={() => navigation.navigate('MyQueue', { id })}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: (StatusBar.currentHeight as number) + 60,
      }}
    >
      <Text
        style={{
          fontFamily: MyFonts.Roboto_500Medium,
          color: MyColors.Text_Header,
          fontSize: 32,
          marginBottom: 20,
          marginLeft: 20,
        }}
      >
        My Queues
      </Text>
      <FlatList
        style={{ marginLeft: 20 }}
        data={data?.me?.joinedQueues}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
