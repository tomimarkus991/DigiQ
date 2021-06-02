import { useApolloClient } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLogoutMutation } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { UserNavProps } from '../../../types/UserParamList';

export const SettingsScreen = ({}: UserNavProps<'SettingsScreen'>) => {
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation({
    errorPolicy: 'ignore',
    fetchPolicy: 'no-cache',
  });
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: MyColors.Background_White,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatorScreen')}
          style={{ ...styles.submitButton }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.submitText, width: '90%' }}>
              Looja kasutaja
            </Text>
            <AntDesign
              name="arrowright"
              style={{ ...styles.icon, width: '10%' }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await logout();
            await apolloClient.resetStore();
            // navigation.navigate('Login');
            // apolloClient.resetStore();
          }}
          style={{ ...styles.submitButton }}
        >
          <Text style={styles.submitText}>Logi välja</Text>
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
  submitButton: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: MyColors.Text_Regular,
  },
  submitText: {
    fontSize: 20,
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_Regular,
  },
});
