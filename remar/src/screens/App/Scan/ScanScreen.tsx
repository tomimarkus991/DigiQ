import { useIsFocused } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QrCodeCamera from '../../../components/scanScreen/QrCodeCamera';
import { HomeParamList } from '../../../types/HomeParamList';
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

  if (hasPermission === null) {
    return (
      <Text style={styles.text}>Requesting for camera permission</Text>
    );
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <>
      {isFocused && (
        <View style={styles.container}>
          <QrCodeCamera navigation={navigation} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});
