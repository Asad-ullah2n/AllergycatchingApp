import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

const Button = ({ title, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.ButtonContainer,
        style,
      ]}
    >
      <View>
        <Text style={styles.ButtonText}>{title?.toUpperCase()}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  ButtonContainer: {
    // flex: 1,
    backgroundColor: Colors.tomato,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  ButtonText: {
    fontWeight: "600",
    fontSize: 15,
  },
  pressed: {
    opacity: 0.7,
  },
});
