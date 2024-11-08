import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextInputComponent = ({
  label,
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false, 
  keyboardType = 'default', 
  onFocus, 
  onBlur, 
  validateInput, 
  errorMessage, 
  inputStyle, 
  containerStyle, 
  labelStyle, 
  max,
  showError = true, 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          if (validateInput) {
            validateInput(text);
          }
        }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={max}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showError && errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});

export default TextInputComponent;
