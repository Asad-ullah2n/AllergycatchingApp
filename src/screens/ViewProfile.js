import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";
import Icon from "../components/Icon";

const ViewProfile = ({ navigation, route }) => {
  const param = route?.params?.routeName || {};
  const [isLoading, setIsLoading] = useState(false);
  const [storedData, setStoredData] = useState([]);
  const [token, setToken] = useState("");
  console.log("tokeeen", token);
  const getData = async () => {
    try {
      setIsLoading(true);
      const datafromStorage = await AsyncStorage.getItem("auth");
      const data = await JSON.parse(datafromStorage);
      console.log("data async data", data);

      setToken(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      // error reading value
      console.log("error while storing data in localStorage", e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const userId = token?.userId;
  const userToken = token?.token;
  console.log("useriddddddd", userId);
  const getAllergyFoods = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://allergy-app-backend.vercel.app/foods/get-item/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const data = await response.json();
      const AllergyArray = data.result[0]?.itemName;
      setStoredData(AllergyArray);
      console.log("dataaa", data.result[0]?.itemName);
      setIsLoading(false);
    } catch (error) {
      // Handle API call error if necessary
      console.error("API call error:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      getAllergyFoods();
    }
  }, [userId]);
  const foodRemoveHandler = (itemToRemove) => {
    const filteredData = storedData.filter((item) => item !== itemToRemove);
    setStoredData(filteredData);
  };
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={({ pressed }) => [
            pressed && styles.pressed,
            { paddingLeft: 20 },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <>
          <View>
            <Text
              style={{
                marginBottom: 10,
                color: Colors.tomato,
                fontWeight: "600",
                fontSize: 18,
              }}
            >
              Your Added foods
            </Text>
          </View>
          <View style={styles.foodItem}>
            {storedData?.map((item, index) => (
              <View key={index.toString()} style={{ flexDirection: "row" }}>
                <Text style={[styles.suggestionText, { margin: 3 }]}>
                  {item}
                </Text>
                {/* <Pressable
            style={({ pressed }) => [
              pressed && styles.pressed,
              { marginLeft: -10 },
            ]}
            onPress={() => foodRemoveHandler(item)}
          >
            <Image
              style={styles.closeImage}
              source={require("../../assets/close.png")}
            />
          </Pressable> */}
              </View>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 24,
  },
  foodItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 3,
  },
  suggestionText: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.tomato,
    borderRadius: 30,
  },
  pressed: {
    opacity: 0.7,
  },
  closeImage: {
    width: 15,
    height: 15,
  },
  suggestionContainer: {
    flex: 1,
    borderRadius: 4,
    // padding: 8,
    paddingHorizontal: 5,
    paddingTop: 8,
    flexDirection: "row", // Add this line to make items display in a row
    flexWrap: "wrap",
    backgroundColor: Colors.lightGray,
  },
});
