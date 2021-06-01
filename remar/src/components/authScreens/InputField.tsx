import { useField } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MyColors, MyFonts } from '../../global';

type InputFieldProps = {
  name: string;
  placeholder: string;
  mb: number;
  value: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  isNumber?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ ...props }) => {
  const { name, placeholder, mb, value, handleChange, isNumber } = props;
  const [_, { error }] = useField(props);

  return (
    <View>
      {error ? (
        <Text
          style={{
            fontFamily: MyFonts.Roboto_500Medium,
            color: MyColors.Text_Error,
            fontSize: 14,
          }}
        >
          {error}
        </Text>
      ) : null}
      {name === 'password' ? (
        <View>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={MyColors.Text_Placeholder}
            autoCapitalize="none"
            nativeID={name}
            secureTextEntry={true}
            value={value}
            onChangeText={handleChange}
            style={styles.input}
            autoCompleteType="off"
          />
          <View
            style={{
              marginTop: 8,
              marginBottom: mb,
              borderBottomColor: MyColors.Line,
              borderBottomWidth: 1,
            }}
          />
        </View>
      ) : (
        <>
          {isNumber ? (
            <View>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={MyColors.Text_Placeholder}
                autoCapitalize="none"
                nativeID={name}
                value={value}
                onChangeText={handleChange}
                style={styles.input}
                autoCompleteType="off"
                textContentType="telephoneNumber"
                keyboardType="decimal-pad"
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: mb,
                  borderBottomColor: MyColors.Line,
                  borderBottomWidth: 1,
                }}
              />
            </View>
          ) : (
            <View>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={MyColors.Text_Placeholder}
                autoCapitalize="none"
                nativeID={name}
                value={value}
                onChangeText={handleChange}
                style={styles.input}
                autoCompleteType="off"
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: mb,
                  borderBottomColor: MyColors.Line,
                  borderBottomWidth: 1,
                }}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: MyColors.Text_Input,
    fontFamily: MyFonts.Roboto_700Bold,
  },
});
