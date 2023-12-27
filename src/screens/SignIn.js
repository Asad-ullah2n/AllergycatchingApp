import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import { Colors } from "../constants/colors";
import Button from "../components/Button";

const SignIn = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "nasad@gmail.com",
    password: "123456",
  });

  const onChangeTextHandler = (value, key) => {
    setValues((val) => ({ ...val, [key]: value }));
  };
  const CreateUserHandler = async () => {
    if (!values.email || !values.password) {
      Alert.alert("All fields required!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://allergy-app-backend.vercel.app/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );
      const responseData = await response.json();
      const token = responseData.token;
      setIsLoading(false);
      if (responseData.status === 200) {
        navigation.navigate("Add Data", { token: token });
      }
    } catch (error) {
      console.log("catch error of sign in ", error.message);
      // alert(error.message);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Sign In</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Input
            placeholder="Name"
            autoComplete="name"
            autoCorrect={false}
            style={styles.Input}
            value={values.name}
            onChangeText={(text) => onChangeTextHandler(text, "name")}
          /> */}
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoComplete="email"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.Input}
              value={values.email}
              onChangeText={(text) => onChangeTextHandler(text, "email")}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.Input}
              value={values.password}
              onChangeText={(text) => onChangeTextHandler(text, "password")}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text></Text>
              <Pressable
                // onPress={() => navigation.navigate("Create Account")}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <Text style={styles.loginText}>Forgot Password</Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Button
                title="Login"
                style={styles.Button}
                onPress={CreateUserHandler}
                // onPress={() => navigation.navigate("Bottom")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ marginVertical: 10, fontWeight: "700", fontSize: 16 }}
              >
                OR
              </Text>
              <Pressable
                onPress={() => navigation.navigate("Create Account")}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <Text style={styles.loginText}>Create Account</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    // flex: 1,
    // justifyContent: "space-between",
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  headingText: {
    color: Colors.tomato,
    fontWeight: "600",
    fontSize: 24,
  },
  Input: {
    marginVertical: 13,
  },
  Button: {
    borderRadius: 20,
    height: 40,
  },
  alreadyText: {
    color: Colors.tomato,
    fontSize: 14,
    fontWeight: "600",
  },
  loginText: {
    color: Colors.tomato,
    fontSize: 14,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
