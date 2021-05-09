import { useApolloClient } from '@apollo/client';
import React from 'react';
import { Text } from 'react-native';
import { Center } from '../../components/Center';
import { Button as CustomButton } from '../../components/custom/Button';

interface UserScreenProps {}

export const UserScreen: React.FC<UserScreenProps> = ({}) => {
  // const apolloClient = useApolloClient();
  // const [logout] = useLogoutMutation();
  // const { data } = useMeQuery({ pollInterval: 100 });
  return (
    <Center>
      {/* <Text>{data?.me?.username}</Text> */}
      <CustomButton
        title="Logout"
        onPress={async () => {
          // await logout();
          // apolloClient.resetStore();
        }}
      />
    </Center>
  );
};
