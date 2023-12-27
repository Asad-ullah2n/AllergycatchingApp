import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScanQR() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const { height } = Dimensions.get("window");
  const scanAreaHeight = height * 0.39;

  const moveAnim = useRef(new Animated.Value(0)).current;
  const animationDuration = 3000;
  const animationStartedRef = useRef(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!animationStartedRef.current) {
      const startAnimation = () => {
        const animationForward = Animated.timing(moveAnim, {
          toValue: scanAreaHeight,
          duration: animationDuration,
          easing: Easing.linear,
          useNativeDriver: false,
        });

        const animationBackward = Animated.timing(moveAnim, {
          toValue: 0,
          duration: animationDuration,
          easing: Easing.linear,
          useNativeDriver: false,
        });
        const loopAnimation = Animated.sequence([
          animationForward,
          animationBackward,
        ]);

        Animated.loop(loopAnimation).start();

        animationStartedRef.current = true;
      };

      startAnimation();
    }

    return () => {
      moveAnim.stopAnimation();
    };
  }, [moveAnim]);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert("Scanned Data", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    if (isLoading) {
      return <ActivityIndicator style={{ flex: 1 }} size="large" />;
    }
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        // style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.scanArea}>
        <View style={styles.scanBlur} />
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{ translateY: moveAnim }],
            },
          ]}
        />
        <View style={styles.topLeftCorner} />
        <View style={styles.topRightCorner} />
        <View style={styles.bottomLeftCorner} />
        <View style={styles.bottomRightCorner} />
      </View>
      <Text style={styles.scannedText}>Scanned: {scannedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  camera: {
    flex: 1,
    overflow: "hidden",
  },
  scanArea: {
    alignSelf: "center",
    position: "relative",
    width: "70%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  scanBlur: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  scanLine: {
    height: 2,
    width: "100%",
    backgroundColor: "red",
    position: "absolute",
  },
  scannedText: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    borderRadius: 5,
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "white", // Specify the border color.
    width: 20, // Adjust the size of the corner view as needed.
    height: 20,
    // borderTopLeftRadius: 10, // Adjust this value to control the corner radius.
  },
  topRightCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "white", // Specify the border color.
    width: 20, // Adjust the size of the corner view as needed.
    height: 20,
    // borderTopRightRadius: 20, // Adjust this value to control the corner radius.
  },
  bottomLeftCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "white", // Specify the border color.
    width: 20, // Adjust the size of the corner view as needed.
    height: 20,
    // borderBottomLeftRadius: 20, // Adjust this value to control the corner radius.
  },
  bottomRightCorner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "white", // Specify the border color.
    width: 20, // Adjust the size of the corner view as needed.
    height: 20,
    // borderBottomRightRadius: 20, // Adjust this value to control the corner radius.
  },
});
