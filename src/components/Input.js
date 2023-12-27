import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

const Input = ({
  placeholder,
  value,
  keyboardType,
  autoComplete,
  autoCorrect,
  style,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.TextInput}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.black,
  },
  TextInput: {
    // borderWidth: 1,
    // borderColor: Colors.tomato,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    height: 40,
    paddingLeft: 10,
  },
});
