import { Formik } from 'formik';
import React from 'react';
import { AuthNavProps } from '../../types/AuthParamList';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { MyColors, MyFonts } from '../../global';
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { FormButton } from '../../components/authScreens/FormButton';
import { AuthHeader } from '../../components/authScreens/AuthHeader';
import { AuthFooter } from '../../components/authScreens/AuthFooter';
import { InputField } from '../../components/authScreens/InputField';
import { ScrollView } from 'react-native-gesture-handler';

export const LoginScreen = ({ navigation }: AuthNavProps<'Login'>) => {
  const [login] = useLoginMutation();
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={{ flex: 1, paddingHorizontal: 30, minHeight: windowHeight }}>
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
              <AuthFooter
                text="Don't have an account?&nbsp;"
                whereTo={() => navigation.navigate('Register')}
                buttonTitle="Create"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: MyColors.Text_Input,
    fontFamily: MyFonts.Roboto_700Bold,
    // color: '#445AE3',
  },
});
