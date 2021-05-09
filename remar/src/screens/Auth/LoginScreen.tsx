import { Formik } from 'formik';
import React from 'react';
import { Center } from '../../components/Center';
import { AuthNavProps } from '../../types/AuthParamList';
import { Button as CustomButton } from '../../components/custom/Button';
import { Text, TextInput, View } from 'react-native';

export const LoginScreen = ({ navigation }: AuthNavProps<'Login'>) => {
  // const [login] = useLoginMutation();
  return (
    <Center>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          // const response = await login({
          //   variables: values,
          //   update: (cache, { data }) => {
          //     cache.writeQuery<MeQuery>({
          //       query: MeDocument,
          //       data: {
          //         __typename: 'Query',
          //         me: data?.login.user,
          //       },
          //     });
          //   },
          // });
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data?.login.errors));
          // }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              placeholder="username or email"
              value={values.usernameOrEmail}
              onChangeText={handleChange('usernameOrEmail')}
            />
            <TextInput
              placeholder="password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
            />
            <View>
              <Text>New to digiline?&nbsp;</Text>

              <CustomButton
                title="Login"
                onPress={() => navigation.navigate('Register')}
              />
            </View>
            <CustomButton title="Logi sisse" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </Center>
  );
};
