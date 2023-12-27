import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterTabs from "../components/FooterTabs";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },
});
