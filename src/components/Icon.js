import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Icon = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default Icon;

const styles = StyleSheet.create({});
