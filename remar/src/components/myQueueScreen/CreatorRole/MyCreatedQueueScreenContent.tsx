import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDeleteQueueMutation } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { Button } from '../../custom/Button';

interface MyCreatedQueueScreenContentProps {
  data: any;
  id: number;
  navigateToQueueScreen: () => void;
  navigateBack: () => void;
}

export const MyCreatedQueueScreenContent: React.FC<MyCreatedQueueScreenContentProps> =
  ({ data, id, navigateToQueueScreen, navigateBack }) => {
    const [deleteQueue] = useDeleteQueueMutation({
      onCompleted: () => navigateBack(),
    });
    return (
      <View style={styles.main}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.main}
            source={{
              uri: data?.imageUri,
            }}
          />
        </View>
        <View style={styles.secondHalf}>
          <TouchableOpacity
            onPress={() =>
              deleteQueue({
                variables: { id },
                update: cache => {
                  cache.evict({ id: 'Queue:' + id });
                  cache.gc();
                },
              })
            }
            style={{ alignSelf: 'flex-end', marginRight: 10 }}
          >
            <MaterialIcons name="delete" size={42} color="red" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {(data?.name.substring(0, 1).toUpperCase() as string) +
              data?.name.substring(1, data?.name.length)}
          </Text>
          <View
            style={{
              flex: 4,
            }}
          >
            <Button
              onPress={() => navigateToQueueScreen()}
              title="Vaata inimesi järjekorras"
            />
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  circle: {
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 6,
    borderColor: MyColors.Button_Blue,
    height: 100,
    width: 100,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  fatText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 36,
    color: MyColors.Text_Header,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 16,
    color: MyColors.Text_Error,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontFamily: MyFonts.Roboto_700Bold,
    fontSize: 36,
    color: MyColors.Text_Header,
    flex: 1,
  },
  secondHalf: {
    flex: 3,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  submitButton: {
    flex: 0.5,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: MyColors.Nice_Blue,
    width: '70%',
    alignSelf: 'center',
  },
  submitText: {
    fontSize: 24,
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_White,
  },
});
