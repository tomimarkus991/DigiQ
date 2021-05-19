import { Formik } from 'formik';
import React from 'react';
import { StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { FormButton } from '../../../components/authScreens/FormButton';
import { InputField } from '../../../components/authScreens/InputField';
import { Button } from '../../../components/custom/Button';
import { useCreateQueueMutation } from '../../../generated/graphql';
import { MyColors, MyFonts } from '../../../global';
import { HomeNavProps } from '../../../types/HomeParamList';

export const CreateQueueScreen = ({ navigation }: HomeNavProps<'Feed'>) => {
  const [createQueue] = useCreateQueueMutation({
    onCompleted: () => navigation.navigate('Feed'),
  });
  const windowHeight = useWindowDimensions().height;
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        minHeight: windowHeight,
      }}
    >
      <View style={{ flex: 0.5 }}>
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Header,
            fontSize: 32,
            marginBottom: 20,
            marginLeft: 20,
            paddingTop: StatusBar.length + 80,
          }}
        >
          Create Queue
        </Text>
      </View>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async values => {
          await createQueue({
            variables: { createQueueInput: values },
            update: cache => {
              cache.evict({});
            },
          });
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 4,
              }}
            >
              <InputField
                mb={20}
                name="name"
                placeholder="Queue Name"
                value={values.name}
                handleChange={handleChange('name')}
              />
              <Button title="Create" onPress={() => handleSubmit()} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({});
