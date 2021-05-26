import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QrScannerSvg } from '../../assets/QrScannerSvg';
import { useCheckIfQueueExistsLazyQuery } from '../../generated/graphql';
import { HomeParamList } from '../../types/HomeParamList';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface QrCodeCameraProps {
  navigation: StackNavigationProp<HomeParamList, 'Feed'>;
}

const QrCodeCamera: React.FC<QrCodeCameraProps> = ({ navigation }) => {
  const [checkQueue] = useCheckIfQueueExistsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data =>
      navigation.navigate('QueueDetail', { id: data.queue.id }),
    onError: () => navigation.navigate('Feed'),
  });
  const onBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    checkQueue({ variables: { id: parseInt(data) } });
  };
  return (
    <Camera
      ratio="16:9"
      style={[StyleSheet.absoluteFillObject, styles.camera]}
      onBarCodeScanned={onBarCodeScanned}
      barCodeScannerSettings={{
        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
      }}
      type={Camera.Constants.Type.back}
      onMountError={event => console.log(event.message)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>Scan your QR code</Text>
        <QrScannerSvg
          style={styles.svg}
          height={350}
          width={350}
          fill="#fff"
        />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
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

export default QrCodeCamera;
