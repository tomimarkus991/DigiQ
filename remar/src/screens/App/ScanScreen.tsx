import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { HomeParamList } from '../../types/HomeParamList';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
interface ScanScreenProps {
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const seeTheLine = (data: any) => {
    console.log(data);

    navigation.navigate('Line', { id: parseInt(data) });
  };

  const onBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    seeTheLine(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      {isFocused && (
        <Camera
          onBarCodeScanned={onBarCodeScanned}
          ratio="16:9"
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <StatusBar style="light" />
    </>
  );
};
