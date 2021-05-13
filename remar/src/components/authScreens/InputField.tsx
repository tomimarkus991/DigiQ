import { useField } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Fonts } from '../../global';

type InputFieldProps = {
  name: string;
  placeholder: string;
  mb: number;
  value: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
};

export const InputField: React.FC<InputFieldProps> = ({ ...props }) => {
  const { name, placeholder, mb, value, handleChange } = props;
  const [_, { error }] = useField(props);

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      {name === 'password' ? (
        <View>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.Text_Placeholder}
            autoCapitalize="none"
            nativeID={name}
            value={value}
            onChangeText={handleChange}
            style={styles.input}
            secureTextEntry={true}
            autoCompleteType="off"
          />
          <View
            style={{
              marginTop: 8,
              marginBottom: mb,
              borderBottomColor: Colors.Line,
              borderBottomWidth: 1,
            }}
          />
        </View>
      ) : (
        <View>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.Text_Placeholder}
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
              borderBottomColor: Colors.Line,
              borderBottomWidth: 1,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: Colors.Text_Input,
    fontFamily: Fonts.Roboto_700Bold,
  },
});
