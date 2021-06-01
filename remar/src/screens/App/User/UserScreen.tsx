import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMeAdvancedQuery } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { UserNavProps } from '../../../types/UserParamList';

export const UserScreen = ({ navigation }: UserNavProps<'UserScreen'>) => {
  const { data } = useMeAdvancedQuery();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: (StatusBar.currentHeight as number) + 20,
        backgroundColor: MyColors.Background_White,
      }}
    >
      <View style={{ flex: 0.5 }}>
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Header,
            fontSize: 32,
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          {data?.me?.username}
        </Text>
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <AntDesign name="setting" style={styles.icon} />
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <AntDesign name="infocirlceo" style={styles.icon} />
          <Text>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <AntDesign name="questioncircleo" style={styles.icon} />
          <Text>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 3,
    flexDirection: 'column',
    marginLeft: 20,
  },
  item: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  icon: {
    color: MyColors.Text_Regular,
    fontSize: 30,
    marginRight: 15,
  },
});
