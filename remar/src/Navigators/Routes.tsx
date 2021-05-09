import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const [me] = useState(null);
  return (
    <NavigationContainer>{me === null ? <AuthStack /> : <AppTabs />}</NavigationContainer>
  );
};
