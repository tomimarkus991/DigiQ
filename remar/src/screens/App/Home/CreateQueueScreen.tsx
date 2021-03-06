import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { InputField } from '../../../components/authScreens/InputField';
import { useCreateQueueMutation } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';
import { MyCreatedQueuesNavProps } from '../../../types/MyCreatedQueuesParamList';

export const CreateQueueScreen = ({
  navigation,
}: MyCreatedQueuesNavProps<'MyCreatedQueues'>) => {
  // @todo make sure this works MyCreatedQueues navigation
  const [createQueue] = useCreateQueueMutation({
    onCompleted: () => navigation.navigate('MyCreatedQueues'),
  });
  const windowHeight = useWindowDimensions().height;
  const uri =
    'https://firebasestorage.googleapis.com/v0/b/digiq-854ab.appspot.com/o/default_image.jpg?alt=media&token=d378b30d-6c81-4af9-a6d5-d890ecf2c688';
  const [imageUri, setImageUri] = useState<string>(uri);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Sorry, we need camera roll permissions to make this work!',
          );
        }
      }
    })();
  }, []);

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri)
        .then(() => {
          setIsReady(true);
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Midagi l??ks valesti');
        });
    }
  };
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri)
        .then(() => {
          setIsReady(true);
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Midagi l??ks valesti');
        });
    }
  };
  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase
      .storage()
      .ref()
      .child('images/' + uuid().toString());

    return ref.put(blob).then(async () => {
      setImageUri(await ref.getDownloadURL());
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        minHeight: windowHeight,
        paddingTop: 30,
      }}
    >
      {/* @todo maybe replace this with header in Stack component */}
      <View style={{ flex: 0.5 }}>
        <Text style={styles.heading}>Loo j??rjekord</Text>
      </View>
      <Formik
        initialValues={{ name: '', estimatedServingtime: '', imageUri }}
        onSubmit={async values => {
          values.imageUri = imageUri;
          await createQueue({
            variables: {
              createQueueInput: {
                name: values.name,
                estimatedServingtime: parseInt(
                  values.estimatedServingtime,
                ),
                imageUri,
              },
            },
            update: cache => {
              cache.evict({});
            },
          });
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={{ flex: 1.2 }}>
            <View
              style={{
                flex: 4.5,
              }}
            >
              <InputField
                mb={20}
                name="name"
                placeholder="J??rjekorra nimi"
                value={values.name}
                handleChange={handleChange('name')}
              />
              <InputField
                mb={20}
                name="estimatedServingtime"
                placeholder="??he kliendi teenindusaeg minutis"
                value={values.estimatedServingtime}
                handleChange={handleChange('estimatedServingtime')}
                isNumber={true}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={chooseImage}
                  style={styles.button}
                >
                  <FontAwesome
                    name="photo"
                    size={24}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>Vali pilt</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 0.1,
                  }}
                />

                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.button}
                >
                  <AntDesign
                    name="camerao"
                    size={24}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>Tee pilt</Text>
                </TouchableOpacity>
              </View>

              <Image source={{ uri: imageUri }} style={styles.image} />
              <TouchableOpacity
                onPress={() =>
                  isReady
                    ? handleSubmit()
                    : Alert.alert('Sa pead ennem pildi valima')
                }
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Loo</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_Header,
    fontSize: 32,
    marginBottom: 20,
    marginLeft: 30,
    paddingTop: StatusBar.length + 35,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flex: 1,
    borderWidth: 1.5,
    borderColor: MyColors.Nice_Blue,
  },
  text: {
    fontSize: 14,
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_Regular,
  },
  image: { width: '100%', height: 200 },
  submitButton: {
    flex: 0.4,
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: MyColors.Nice_Blue,
    width: '50%',
    maxHeight: 50,
    alignSelf: 'center',
  },
  submitText: {
    fontSize: 24,
    fontFamily: MyFonts.Roboto_500Medium,
    color: MyColors.Text_White,
  },
  icon: {
    color: MyColors.Text_Regular,
  },
});
