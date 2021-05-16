import { useApolloClient } from '@apollo/client';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Button as CustomButton } from '../../../components/custom/Button';
import {
  useLogoutMutation,
  useMakeUserCreatorMutation,
  useMeAdvancedQuery,
} from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { UserNavProps } from '../../../types/UserParamList';

export const UserScreen = ({ navigation }: UserNavProps<'UserScreen'>) => {
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const [makeUserCreator] = useMakeUserCreatorMutation();
  const { data } = useMeAdvancedQuery();

  return (
    <View style={{ flex: 1, paddingTop: (StatusBar.currentHeight as number) + 20 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Header,
            fontSize: 32,
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
          Hello {data?.me?.username}
        </Text>
      </View>
      <CustomButton
        title="Check out my queues"
        onPress={() => {
          navigation.navigate('MyQueues');
        }}
      />
      <Text>am i creator {data?.me?.isCreator.toString()}</Text>
      <CustomButton
        title="Logout"
        onPress={async () => {
          await logout();
          apolloClient.resetStore();
        }}
      />
      {!data?.me?.isCreator && (
        <CustomButton
          title="Make User Creator"
          onPress={async () => {
            await makeUserCreator();
          }}
        />
      )}
    </View>
  );
};
