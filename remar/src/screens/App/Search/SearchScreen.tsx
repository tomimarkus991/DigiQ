import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import { QueueCard } from '../../../components/homeScreen/QueueCard';
import {
  useSearchQueuesLazyQuery,
  useSearchQueuesQuery,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

export const SearchScreen = ({ navigation }: HomeNavProps<'Feed'>) => {
  const [searchQueue, { data }] = useSearchQueuesLazyQuery();

  let renderItem = (data: any) => {
    return (
      <QueueCard
        data={data.item}
        navigation={() =>
          navigation?.navigate('QueueDetail', { id: data.item.id })
        }
      />
    );
  };

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <TextInput
        style={{ ...styles.searchInput }}
        placeholder="Search"
        autoCapitalize="none"
        onChangeText={text =>
          text.length >= 2
            ? searchQueue({ variables: { searchString: text } })
            : searchQueue({
                variables: {
                  searchString: 'das534cxx<zxcvxc534534545fsdfkjls',
                },
              })
        }
      />
      <FlatList
        data={data?.search}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item: any) => item.id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    backgroundColor: MyColors.Background_White,
  },
  searchInput: {
    fontFamily: MyFonts.Roboto_500Medium,
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 2,
    marginTop: 20,
    borderColor: '#CBD5E0',
    borderWidth: 1,
  },
});
