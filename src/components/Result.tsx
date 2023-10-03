import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  ScrollView,
  Sheet,
  Text,
  XStack,
  H2,
  Paragraph,
} from "tamagui";

import { Video } from "expo-av";
import { Activity, Airplay } from "@tamagui/lucide-icons";
import OptionComponent from "./Option";

interface ResultOption {
  type: "text" | "image" | "video";
  value: string;
}

interface ResultProps {
  options: ResultOption[];
  number: string;
}

interface SheetInfoProps {
  option: ResultOption;

  setOpen: (open: boolean) => void;
}

const Result: React.FC<ResultProps> = ({ options, result }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {options.map((option, index) => (
          // <Text>
          //   {" "}
          //   {result} {option.value}{" "}
          // </Text>
          <OptionComponent
            option={option}
            selected={result === option.result}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Result;
