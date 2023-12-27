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

const CreateProfile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "123456",
    rePassword: "123456",
  });

  const onChangeTextHandler = (value, key) => {
    setValues((val) => ({ ...val, [key]: value }));
  };
  const CreateUserHandler = async () => {
    if (
      !values.name ||
      !values.email ||
      !values.password ||
      !values.phone ||
      !values.rePassword
    ) {
      Alert.alert("All fields required!");
      return;
    }
    if (values.password !== values.rePassword) {
      Alert.alert("Make sure that password & rePassword must same");
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://allergy-app-backend.vercel.app/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phoneNo: values.phone,
            password: values.password,
            confirmPassword: values.rePassword,
          }),
        }
      );
      setIsLoading(false);
      const responseData = await response.json();
      if (responseData.success) {
        navigation.navigate("Sign In");
      }
    } catch (error) {
      console.log("registration Error", error);
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
            <Text style={styles.headingText}>Create Account</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              placeholder="Name"
              autoComplete="name"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.Input}
              value={values.name}
              onChangeText={(text) => onChangeTextHandler(text, "name")}
            />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoComplete="email"
              autoCorrect={false}
              style={styles.Input}
              value={values.email}
              onChangeText={(text) => onChangeTextHandler(text, "email")}
              autoCapitalize="none"
            />
            <Input
              placeholder="Phone"
              keyboardType="number-pad"
              autoCorrect={false}
              style={styles.Input}
              value={values.phone}
              onChangeText={(text) => onChangeTextHandler(text, "phone")}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              autoCorrect={false}
              style={styles.Input}
              value={values.password}
              onChangeText={(text) => onChangeTextHandler(text, "password")}
              autoCapitalize="none"
            />
            <Input
              placeholder="Retype Password"
              secureTextEntry={true}
              autoComplete="name"
              autoCorrect={false}
              style={styles.Input}
              value={values.rePassword}
              onChangeText={(text) => onChangeTextHandler(text, "rePassword")}
              autoCapitalize="none"
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={styles.alreadyText}>Already have Account !</Text>
              <Pressable
                onPress={() => navigation.navigate("Sign In")}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
            </View>
          </ScrollView>

          <Button
            title="Create Account"
            style={styles.Button}
            onPress={CreateUserHandler}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    // flex: 1,
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
