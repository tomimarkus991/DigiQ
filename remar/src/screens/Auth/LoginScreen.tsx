import { Formik } from 'formik';
import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { AuthFooter } from '../../components/authScreens/AuthFooter';
import { AuthHeader } from '../../components/authScreens/AuthHeader';
import { FormButton } from '../../components/authScreens/FormButton';
import { InputField } from '../../components/authScreens/InputField';
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
} from '../../generated/graphql';
import { MyColors } from '../../global';
import { AuthNavProps } from '../../types/AuthParamList';
import { toErrorMap } from '../../utils/toErrorMap';

export const LoginScreen = ({ navigation }: AuthNavProps<'Login'>) => {
  const [login] = useLoginMutation();

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
          <View style={{ flex: 1 }}>
            <AuthHeader />
            <View
              style={{
                flex: 5,
              }}
            >
              <InputField
                mb={20}
                name="usernameOrEmail"
                placeholder="Kasutajanimi või meil"
                value={values.usernameOrEmail}
                handleChange={handleChange('usernameOrEmail')}
              />
              <InputField
                mb={30}
                name="password"
                placeholder="Salasõna"
                value={values.password}
                handleChange={handleChange('password')}
              />
              <FormButton title="Logi sisse" handleSubmit={handleSubmit} />
              <AuthFooter
                text="Kas sul pole kasutajat?&nbsp;"
                whereTo={() => navigation.navigate('Register')}
                buttonTitle="Registreeri"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
