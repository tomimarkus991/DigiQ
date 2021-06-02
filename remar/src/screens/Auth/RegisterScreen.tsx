import { Formik } from 'formik';
import React from 'react';
import { AuthNavProps } from '../../types/AuthParamList';
import { useWindowDimensions, View } from 'react-native';
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { AuthFooter } from '../../components/authScreens/AuthFooter';
import { AuthHeader } from '../../components/authScreens/AuthHeader';
import { InputField } from '../../components/authScreens/InputField';
import { FormButton } from '../../components/authScreens/FormButton';
import { MyColors } from '../../global';

export const RegisterScreen = ({
  navigation,
}: AuthNavProps<'Register'>) => {
  const [register] = useRegisterMutation();
  const windowHeight = useWindowDimensions().height;
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        minHeight: windowHeight,
        backgroundColor: MyColors.Background_White,
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
          <View style={{ flex: 1 }}>
            <AuthHeader />
            <View
              style={{
                flex: 6,
              }}
            >
              <InputField
                mb={20}
                name="username"
                placeholder="Kasutajanimi"
                value={values.username}
                handleChange={handleChange('username')}
              />
              <InputField
                mb={20}
                name="email"
                placeholder="Meil"
                value={values.email}
                handleChange={handleChange('email')}
              />
              <InputField
                mb={30}
                name="password"
                placeholder="Salasõna"
                value={values.password}
                handleChange={handleChange('password')}
              />
              <FormButton
                title="Registreeri"
                handleSubmit={handleSubmit}
              />
              <AuthFooter
                text="Sul juba on kasutaja?&nbsp;"
                whereTo={() => navigation.navigate('Login')}
                buttonTitle="Logi sisse"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
