import { Formik } from 'formik';
import React from 'react';
import { AuthNavProps } from '../../types/AuthParamList';
import { View } from 'react-native';
import { MeDocument, MeQuery, useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { AuthFooter } from '../../components/authScreens/AuthFooter';
import { AuthHeader } from '../../components/authScreens/AuthHeader';
import { InputField } from '../../components/InputField';
import { FormButton } from '../../components/authScreens/FormButton';

export const RegisterScreen = ({ navigation }: AuthNavProps<'Register'>) => {
  const [register] = useRegisterMutation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { registerUserInput: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
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
                name="username"
                placeholder="Username"
                value={values.username}
                handleChange={handleChange('username')}
              />
              <InputField
                mb={20}
                name="email"
                placeholder="Email"
                value={values.email}
                handleChange={handleChange('email')}
              />
              <InputField
                mb={30}
                name="password"
                placeholder="Password"
                value={values.password}
                handleChange={handleChange('password')}
              />
              <FormButton title="Register" handleSubmit={handleSubmit} />
            </View>
            <AuthFooter
              text="Already have an account?&nbsp;"
              whereTo={() => navigation.navigate('Login')}
              buttonTitle="Login"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
