import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Center } from '../../components/overall/Center';
import { Button as CustomButton } from '../../components/custom/Button';
import {
  useLogoutMutation,
  useMakeUserCreatorMutation,
  useMeAdvancedQuery,
  useMeQuery,
} from '../../generated/graphql';

interface UserScreenProps {}

export const UserScreen: React.FC<UserScreenProps> = ({}) => {
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const [makeUserCreator] = useMakeUserCreatorMutation();
  const { data } = useMeAdvancedQuery();

  return (
    <Center>
      <Text>{data?.me?.username}</Text>
      <Text>am i{data?.me?.isCreator.toString()}</Text>
      <CustomButton
        title="Logout"
        onPress={async () => {
          await logout();
          apolloClient.resetStore();
        }}
      />
      <CustomButton
        title="Make User Creator"
        onPress={async () => {
          await makeUserCreator();
          apolloClient.resetStore();
        }}
      />
    </Center>
  );
};
