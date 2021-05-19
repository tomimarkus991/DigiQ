import React from 'react';
import { QueueCardContent } from './QueueCardContent';

interface QueueCardProps {
  data: any;
  navigation: () => void;
}

export const QueueCard: React.FC<QueueCardProps> = ({ data, navigation }) => {
  return (
    <>
      <QueueCardContent data={data} navigation={navigation} />
    </>
  );
};
