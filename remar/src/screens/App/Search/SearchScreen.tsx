import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PageHeader } from '../../../components/overall/PageHeader';
import { MyFonts } from '../../../global';

interface SearchScreenProps {}

export const SearchScreen: React.FC<SearchScreenProps> = ({}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3a324756d53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fb65434d91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd966456-145571e29d72',
      title: 'Third Item',
    },
  ];
  const renderItem = ({ item }: any) => (
    <View style={{ marginBottom: 3 }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <PageHeader title="Search" />
      <TextInput style={{ ...styles.searchInput }} placeholder="Search" />
      <Text
        style={{ fontFamily: MyFonts.Roboto_500Medium, fontSize: 16, marginBottom: 3 }}
      >
        Popular Categories
      </Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      ></FlatList>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  searchInput: {
    fontFamily: MyFonts.Roboto_500Medium,
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 2,
    borderColor: '#CBD5E0',
    borderWidth: 1,
  },
});
