import { Formik } from 'formik';
import React from 'react';
import { Center } from '../../components/Center';
import { AuthNavProps } from '../../types/AuthParamList';
import { Button as CustomButton } from '../../components/custom/Button';
import { Text, TextInput, View } from 'react-native';

export const RegisterScreen = ({ navigation }: AuthNavProps<'Register'>) => {
  // const [register] = useRegisterMutation();
  return (
    <Center>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await register({
          //   variables: { input: values },
          //   update: (cache, { data }) => {
          //     cache.writeQuery<MeQuery>({
          //       query: MeDocument,
          //       data: {
          //         __typename: 'Query',
          //         me: data?.register.user,
          //       },
          //     });
          //   },
          // });
          // if (response.data?.register.errors) {
          //   setErrors(toErrorMap(response.data.register.errors));
          // }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              placeholder="username"
              value={values.username}
              onChangeText={handleChange('username')}
            />
            <TextInput
              placeholder="email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            <TextInput
              placeholder="password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
            />
            <View>
              <Text>Already a have an account?&nbsp;</Text>

              <CustomButton title="Login" onPress={() => navigation.navigate('Login')} />
            </View>
            <CustomButton title="Registreeri" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </Center>
  );
};
