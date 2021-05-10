import { Formik } from 'formik';
import React from 'react';
import { AuthNavProps } from '../../types/AuthParamList';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../global';

export const RegisterScreen = ({ navigation }: AuthNavProps<'Register'>) => {
  // const [register] = useRegisterMutation();
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
          <View
            style={{
              display: 'flex',
              width: '85%',
              height: '90 %',
            }}
          >
            <View style={{ flex: 5, justifyContent: 'center' }}>
              <Text
                style={{
                  fontFamily: Fonts.Roboto_700Bold,
                  fontSize: 48,
                  textAlign: 'center',
                  color: Colors.Text_Header,
                }}
              >
                Digi Q
              </Text>
            </View>
            <View
              style={{
                flex: 5,
              }}
            >
              <TextInput
                placeholder="Username or Email"
                value={values.username}
                onChangeText={handleChange('username')}
                style={styles.input}
                placeholderTextColor={Colors.Text_Placeholder}
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 20,
                  borderBottomColor: Colors.Line,
                  borderBottomWidth: 1,
                }}
              />
              <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                style={styles.input}
                placeholderTextColor={Colors.Text_Placeholder}
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 20,
                  borderBottomColor: Colors.Line,
                  borderBottomWidth: 1,
                }}
              />
              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor={Colors.Text_Placeholder}
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 30,
                  borderBottomColor: Colors.Line,
                  borderBottomWidth: 1,
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <View
                    style={{
                      backgroundColor: Colors.Button_Blue,
                      marginTop: 10,
                      marginVertical: 60,
                      padding: 10,
                      borderRadius: 10,
                      width: 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.Text_Regular,
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    >
                      Create
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '85%',
                alignItems: 'baseline',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  color: Colors.Text_Gray,
                  fontSize: 18,
                  textAlign: 'center',
                  fontFamily: Fonts.Roboto_500Medium,
                  marginRight: 6,
                }}
              >
                Already have an account?&nbsp;
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View
                  style={{
                    backgroundColor: Colors.Button_Purple,
                    marginTop: 10,
                    marginVertical: 60,
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.Text_Regular,
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  >
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
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
    color: Colors.Text_Input,
    fontFamily: Fonts.Roboto_700Bold,
    // color: '#445AE3',
  },
});
