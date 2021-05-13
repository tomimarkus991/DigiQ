import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { data } = useMeQuery();

  return (
    <NavigationContainer>{data?.me ? <AppTabs /> : <AuthStack />}</NavigationContainer>
  );
};
