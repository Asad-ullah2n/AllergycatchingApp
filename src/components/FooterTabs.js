import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const FooterTabs = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <Text>Profile</Text>
      </Pressable>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <Text>ScanQR</Text>
      </Pressable>
    </View>
  );
};

export default FooterTabs;

const styles = StyleSheet.create({
  pressed: { opacity: 0.5 },
});
