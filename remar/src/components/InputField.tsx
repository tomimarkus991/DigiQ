import { useField } from 'formik';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({ ...props }) => {
  const { label, placeholder, name } = props;
  const [field, { error }] = useField(props);

  return (
    <View>
      {/* <label htmlFor={field.name}>{label}</label> */}
      {name === 'password' ? (
        <TextInput
          {...field}
          {...props}
          nativeID={field.name}
          placeholder={placeholder}
          textContentType="password"
        />
      ) : (
        <TextInput
          {...field}
          {...props}
          nativeID={field.name}
          placeholder={placeholder}
        />
      )}

      {error ? <Text>{error}</Text> : null}
    </View>
  );
};
