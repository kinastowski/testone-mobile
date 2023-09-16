import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Circle } from "tamagui";

interface TimerProps {
  active: boolean; // true to start, false to stop
  testId: string;
}

const TimerComponent: React.FC<TimerProps> = ({ active, testId }) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setSeconds(0); // Reset the timer on every render
  }, [testId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Circle size={100} backgroundColor="$color" elevation="$4">
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      </Circle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 20,
    color: "white",
    fontFamily: "Silkscreen",
  },
});

export default TimerComponent;
