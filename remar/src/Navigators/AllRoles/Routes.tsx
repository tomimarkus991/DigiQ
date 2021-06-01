import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { AuthStack } from './AuthStack';
import { MainApp } from './MainApp';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { data } = useMeQuery();
  return (
    <NavigationContainer>
      {data?.me ? (
        <MainApp isCreator={data.me.isCreator} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
