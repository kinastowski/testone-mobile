import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import { BlurView } from "@react-native-community/blur";
import { Circle } from "tamagui";

interface CountdownProps {
  duration: number; // duration in seconds
  onCoutdownEnd: () => void;
}

const { width, height } = Dimensions.get("window");

const CountdownComponent: React.FC<CountdownProps> = ({
  duration,
  onCoutdownEnd,
}) => {
  const [seconds, setSeconds] = useState<number>(duration);

  useEffect(() => {
    if (seconds >= 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval); // cleanup on component unmount
    } else {
      onCoutdownEnd();
    }
  }, [seconds]);

  const formatTime = (time: number) => {
    if (time <= 0) return "start";
    // const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${secs}`;
  };

  return (
    <View style={styles.container} blurType="light" blurAmount={10}>
      {seconds > 0 && (
        <Circle size={100} backgroundColor="$color" elevation="$4">
          <Text style={styles.count}>{formatTime(seconds)}</Text>
        </Circle>
      )}
      {seconds <= 0 && <Text style={styles.count2}>start</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",

    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1000,
  },
  count: {
    fontSize: 40,
    color: "black",
    fontFamily: "Silkscreen",
  },
  count2: {
    fontSize: 60,
    color: "black",
    fontFamily: "Silkscreen",
  },
});

export default CountdownComponent;
