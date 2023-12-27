import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { Colors } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const allergenic_foods = [
  {
    id: 1,
    name: "Peanuts",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 2,
    name: "Tree nuts ",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 3,
    name: "Milk (cow's milk)",
    reactions: ["Abdominal pain", "Vomiting", "Diarrhea"],
  },
  {
    id: 4,
    name: "Eggs",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 5,
    name: "Wheat",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 6,
    name: "Soy",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 7,
    name: "Fish",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 8,
    name: "Shellfish",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 9,
    name: "Sesame seeds",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 10,
    name: "Mustard",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 11,
    name: "Sulphites and sulfites",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 12,
    name: "Lupin",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 13,
    name: "Celery",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 14,
    name: "Mollusks",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 15,
    name: "Stone fruits",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 16,
    name: "Kiwi",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 17,
    name: "Avocado",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 18,
    name: "Papaya",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 19,
    name: "Pineapple",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
  {
    id: 20,
    name: "Melons",
    reactions: ["Hives", "Swelling", "Anaphylaxis"],
  },
];
const ProfileScreen = ({ navigation, route }) => {
  const para = route.params || {};

  const [foods, setFoods] = useState("");
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  console.log("userID", userId);
  console.log("para", para);

  useEffect(() => {
    if (para && para.token) {
      // Decode the JWT token
      try {
        const decodedToken = jwtDecode(para.token);

        // Access the 'userId' property from the decoded token
        const { userId } = decodedToken;

        // Set the 'userId' in the component state
        setUserId(userId);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, [para]); // Add 'para' as a dependency of the useEffect hook

  // ... Rest of the component ...

  // Conditional rendering based on 'para' existence
  if (!para) {
    return null; // If 'para' doesn't exist, don't render anything
  }
  let filter = [];
  filter = allergenic_foods.filter((item) =>
    item.name.toLowerCase().includes(foods.toLowerCase())
  );
  console.log("data", data);
  const HandleTextInput = (text) => {
    setFoods(text);
  };
  const foodRemoveHandler = (itemToRemove) => {
    const filteredData = data.filter((item) => item !== itemToRemove);
    setData(filteredData);
  };
  const handlePress = (foodName) => {
    if (!data.includes(foodName)) {
      setData((prevData) => [...prevData, foodName]);
    } else {
      Alert.alert(`"${foodName}" already added`);
    }

    setFoods("");
  };
  // console.log("finde", filter);
  // store in async storage
  const addFoodHandler = async (foodData) => {
    try {
      const response = await fetch(
        `https://allergy-app-backend.vercel.app/foods/add-item`,
        {
          method: "POST",
          body: JSON.stringify({
            items: foodData,
            user: userId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${para.token}`,
          },
        }
      );
      const responseData = await response.json();
      const token = para?.token;
      console.log("responseDataaa", responseData, userId);
      if (responseData.success) {
        console.log("responseDataaa0", para?.token, userId);
        try {
          const jsonValue = JSON.stringify({ userId, token });
          const asad = await AsyncStorage.setItem("auth", jsonValue);
          console.log("asad", asad);
        } catch (e) {
          // saving error
          console.log("error", e);
        }

        navigation.navigate("Bottom");
      }
    } catch (error) {
      // Handle API call error if necessary
      console.error("API call error:", error);
    }
  };
  const storeLocallyHandler = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("foods", jsonValue);
    } catch (e) {
      // saving error
      console.log("error", e);
    }
    if (value.length === 0) {
      Alert.alert('Add some foods to check for "Allergy"');
    } else {
      navigation.navigate("Bottom", { routeName: "local" });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={foods}
            onChangeText={HandleTextInput}
            multiline
            placeholder="Search Foods"
          />
          <View style={styles.foodItem}>
            {data.map((item, index) => (
              <View key={index.toString()} style={{ flexDirection: "row" }}>
                <Text style={[styles.suggestionText, { margin: 3 }]}>
                  {item}
                </Text>
                <Pressable
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
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        {filter.length > 0 ? (
          <View style={styles.suggestionContainer}>
            {filter.map((food) => (
              <Pressable
                key={food.id}
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => handlePress(food.name)}
              >
                <View style={styles.foodItem}>
                  <Text style={styles.suggestionText}>{food.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.NoItemFoundContainer}>
            <Text style={styles.notFoundText}>
              Sorry No Such a Category Found!
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          style={styles.Button}
          title="click to add "
          onPress={
            para?.token
              ? () => addFoodHandler(data)
              : () => storeLocallyHandler(data)
          }
        />
        <Button
          style={styles.Button}
          title="Register Account"
          onPress={() => navigation.navigate("Create Account")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  textInput: {
    borderBottomWidth: 0.4,
    padding: 8,
    marginBottom: 5,
  },
  textInputContainer: {
    // flex: 1,
    // borderWidth: 0.5,
    // borderColor: Colors.black,
    borderRadius: 4,
    padding: 8,
    width: "100%",
    marginBottom: 10,
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
  NoItemFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    height: 30,
  },
  notFoundText: {
    color: Colors.tomato,
    fontSize: 16,
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Button: {
    borderRadius: 20,
    height: 40,
    // marginTop: 30,
    width: 133,
  },
});
