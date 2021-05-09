import { Formik } from 'formik';
import React from 'react';
import { Center } from '../../components/Center';
import { AuthNavProps } from '../../types/AuthParamList';
import { Button as CustomButton } from '../../components/custom/Button';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const LoginScreen = ({ navigation }: AuthNavProps<'Login'>) => {
  // const [login] = useLoginMutation();
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
          <View style={{ display: 'flex', width: '85%' }}>
            {/* inputs */}
            <View>
              <TextInput
                placeholder="Username or Email"
                value={values.usernameOrEmail}
                onChangeText={handleChange('usernameOrEmail')}
                style={styles.input}
                placeholderTextColor="#37373b"
              />
              {/* make this line component */}
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 12,
                  borderBottomColor: '#b6b6b8',
                  borderBottomWidth: 1,
                }}
              />
              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#37373b"
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 20,
                  borderBottomColor: '#b6b6b8',
                  borderBottomWidth: 1,
                }}
              />
            </View>
            {/* inputs */}

            {/* login */}
            <View>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <View
                  style={{
                    backgroundColor: '#445AE3',
                    marginTop: 10,
                    marginVertical: 60,
                    padding: 10,
                    borderRadius: 10,
                    width: '30%',
                  }}
                >
                  <Text style={{ color: '#E2E8F0', fontSize: 18, textAlign: 'center' }}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* login */}

            {/* dont have account */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
              }}
            >
              <Text
                style={{
                  color: '#78787d',
                  fontSize: 18,
                  textAlign: 'center',
                  fontFamily: 'Roboto_500Medium',
                }}
              >
                Don't have an account?&nbsp;
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <View
                  style={{
                    backgroundColor: '#EB69FE',
                    marginTop: 10,
                    marginVertical: 60,
                    padding: 10,
                    borderRadius: 10,
                    // width: '30%',
                  }}
                >
                  <Text
                    style={{
                      color: '#E2E8F0',
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  >
                    CREATE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* dont have account */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: '#DBDADF',
    fontFamily: 'Roboto_700Bold',
    // color: '#445AE3',
  },
});
