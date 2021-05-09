import React from 'react';
import { Text } from 'react-native';

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Text
      style={{
        // fontFamily: 'Roboto_500Medium',
        fontSize: 24,
        marginBottom: 2,
      }}
    >
      {title}
    </Text>
  );
};
