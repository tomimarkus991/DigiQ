import React from 'react';
import { CreatorAppTabs } from '../CreatorRole/CreatorAppTabs';
import { UserAppTabs } from '../UserRole/UserAppTabs';

interface MainAppProps {
  isCreator: boolean;
}

export const MainApp: React.FC<MainAppProps> = ({ isCreator }) => {
  return <>{isCreator ? <CreatorAppTabs /> : <UserAppTabs />}</>;
};
