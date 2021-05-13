import { Formik } from 'formik';
import React from 'react';
import { AuthNavProps } from '../../types/AuthParamList';
import { StyleSheet, View } from 'react-native';
import { Colors, Fonts } from '../../global';
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from '../../components/InputField';
import { FormButton } from '../../components/authScreens/FormButton';
import { AuthHeader } from '../../components/authScreens/AuthHeader';
import { AuthFooter } from '../../components/authScreens/AuthFooter';

export const LoginScreen = ({ navigation }: AuthNavProps<'Login'>) => {
  const [login] = useLoginMutation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { loginUserInput: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user,
                },
              });
            },
          });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View
            style={{
              display: 'flex',
              width: '85%',
              height: '90%',
            }}
          >
            <AuthHeader />
            <View
              style={{
                flex: 5,
              }}
            >
              <InputField
                mb={20}
                name="usernameOrEmail"
                placeholder="Username or Email"
                value={values.usernameOrEmail}
                handleChange={handleChange('usernameOrEmail')}
              />
              <InputField
                mb={30}
                name="password"
                placeholder="Password"
                value={values.password}
                handleChange={handleChange('password')}
              />
              <FormButton title="Login" handleSubmit={handleSubmit} />
            </View>
            <AuthFooter
              text="Don't have an account?&nbsp;"
              whereTo={() => navigation.navigate('Register')}
              buttonTitle="Create"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: Colors.Text_Input,
    fontFamily: Fonts.Roboto_700Bold,
    // color: '#445AE3',
  },
});
