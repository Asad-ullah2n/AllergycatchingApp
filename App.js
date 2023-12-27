import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProfileScreen from "./src/screens/ProfileScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ViewProfile from "./src/screens/ViewProfile";
import ScanQR from "./src/screens/ScanQR";
import Icon from "./src/components/Icon";
import { Colors } from "./src/constants/colors";
import CreateProfile from "./src/screens/CreateProfile";
import SignIn from "./src/screens/SignIn";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Bottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.tomato,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="View Profile"
        component={ViewProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-qr-code-sharp" color="black" size={size} />
          ),
          headerStyle: {
            backgroundColor: Colors.tomato,
          },
        }}
      />
      <Tab.Screen
        name="Scan QR"
        component={ScanQR}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-qr-code-sharp" color="black" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <StatusBar />
        <StatusBar style="auto" hidden={false} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Add Data"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create Account"
              component={CreateProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sign In"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bottom"
              component={Bottom}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopWidth: 1, // Add a top border for the tab bar (optional)
    borderTopColor: "#ccc", // Border color (optional)
    paddingTop: 5, // Add top padding to create space between content and tab bar
    paddingBottom: 5, // Add bottom padding to create space between content and tab bar
    backgroundColor: "#fff", // Background color for the tab bar
  },
});
