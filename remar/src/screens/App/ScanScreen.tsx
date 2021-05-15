import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeParamList } from '../../types/HomeParamList';
import { Camera } from 'expo-camera';

import { useIsFocused } from '@react-navigation/core';

import { QrScannerSvg } from '../../assets/QrScannerSvg';
import { useCheckIfQueueExistsLazyQuery } from '../../generated/graphql';
import { BarCodeScanner } from 'expo-barcode-scanner';
interface ScanScreenProps {
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [checkQueue] = useCheckIfQueueExistsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => navigation.navigate('Queue', { id: data.queue.id }),
    onError: () => navigation.navigate('Feed'),
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    checkQueue({ variables: { id: parseInt(data) } });
  };

  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <>
      {isFocused && (
        <View style={styles.container}>
          <Camera
            ratio="16:9"
            style={[StyleSheet.absoluteFillObject, styles.camera]}
            onBarCodeScanned={onBarCodeScanned}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Scan your QR code</Text>
              <QrScannerSvg style={styles.svg} height={350} width={350} fill="#fff" />
            </View>
          </Camera>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  svg: {
    marginTop: 50,
    marginBottom: 50,
    flex: 0.1,
    alignItems: 'center',
  },
});
