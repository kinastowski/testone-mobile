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
  H3,
  H4,
  Paragraph,
} from "tamagui";

import { Video } from "expo-av";
import { Activity, Airplay } from "@tamagui/lucide-icons";
import OptionComponent from "./Option";
import StarRating from "react-native-star-rating-widget";

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

const Result: React.FC<ResultProps> = ({ options, results, taskId }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {options &&
          options.map((option, index) => {
            try {
              const res = results[option.value];
              return (
                <View style={styles.result} ta="center">
                  <H3></H3>
                  <XStack px="$2" mb="$2">
                    <Paragraph ta="justify" fontFamily={"$silkscreen"}>
                      Opcja {index + 1}
                    </Paragraph>
                  </XStack>
                  <XStack px="$2" mb="$2" ta="center">
                    <StarRating rating={res.rating} />
                  </XStack>
                  <OptionComponent
                    option={option}
                    key={index}
                    taskId={taskId}
                  />
                  <Text>{res.comment}</Text>
                </View>
              );
            } catch (e) {
              console.log(e);
            }
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: 20,
    width: Dimensions.get("window").width - 100,
  },
});

export default Result;
