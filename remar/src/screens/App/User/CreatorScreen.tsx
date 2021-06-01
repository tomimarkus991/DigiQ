import { useApolloClient } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useMakeUserCreatorMutation,
  useMeAdvancedQuery,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';

export const CreatorScreen: React.FC = ({}) => {
  const [makeUserCreator] = useMakeUserCreatorMutation();
  const { data } = useMeAdvancedQuery();
  const apolloClient = useApolloClient();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: MyColors.Background_White,
      }}
    >
      <View style={{ flex: 0.5 }}>
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Header,
            fontSize: 32,
            marginLeft: 60,
            paddingTop: (StatusBar.currentHeight as number) + 8,
          }}
        >
          Creator Settings
        </Text>
      </View>
      <View style={{ flex: 0.2 }}>
        {data?.me?.isCreator ? (
          <Text
            style={{
              fontFamily: MyFonts.Roboto_500Medium,
              color: MyColors.Text_Header,
              fontSize: 32,
              textAlign: 'center',
            }}
          >
            Sa oled looja kasutaja
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: MyFonts.Roboto_500Medium,
              color: MyColors.Text_Header,
              fontSize: 32,
              textAlign: 'center',
            }}
          >
            Sa ei ole looja kasutaja
          </Text>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {!data?.me?.isCreator && (
          <TouchableOpacity
            onPress={async () => {
              await makeUserCreator();
              await apolloClient.resetStore();
            }}
            style={{ ...styles.submitButton }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.submitText, width: '90%' }}>
                Tee kasutaja Loojaks
              </Text>
              <AntDesign
                name="arrowright"
                style={{ ...styles.icon, width: '10%' }}
              />
            </View>
          </TouchableOpacity>
        )}
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
