import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { styled, Card, Button, XStack, H4, Text } from "tamagui";
import { CheckCircle } from "@tamagui/lucide-icons";

import Image from "./Image";

interface OptionProps {
  option: ResultOption;
  selected?: boolean;
  onPress?: () => void;
}

interface ResultOption {
  type: "text" | "image" | "video";
  value: string;
}

const screenWidth = Dimensions.get("window").width - 100;
// const screenWidth = Dimensions.get("window").width - 100;

const StyledCard = styled(Card, {
  name: "StyledCard", // useful for debugging, and Component themes

  padding: "$4",
  marginBottom: "$4",
});

export const Title = styled(Card.Header, {
  name: "Title", // useful for debugging, and Component themes

  padding: "$2",
});

const OptionComponent: React.FC<OptionProps> = ({
  taskId,
  option,
  selected,
  onPress,
}) => {
  const renderOption = (option: ResultOption) => {
    switch (option.type) {
      case 1:
        return (
          <View style={styles.container}>
            <Text style={styles.optionText}>{option.value}</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <Image src={option.value} style={styles.cardContent} />
          </View>
        );

      case 3:
        return (
          <Video
            source={option.value}
            style={styles.cardContent}
            useNativeControls
          />
        );
      default:
        return null;
    }
  };

  if (!option) return null;

  // useEffect(() => {}, []);

  return (
    <StyledCard
      // elevate
      animation="bouncy"
      size="$6"
      width={screenWidth}
      height={screenWidth}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      style={selected ? styles.cardSelected : styles.card}
      onPress={onPress}
    >
      {/* <Title></Title> */}
      <Card.Footer padded>
        <XStack flex={1} />
        {selected && (
          <Button size="$6" icon={CheckCircle} color={"green"}>
            Twój wybór
          </Button>
        )}
      </Card.Footer>
      <Card.Background borderRadius="$4">
        {renderOption(option)}
      </Card.Background>
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  cardSelected: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "green",
  },
  card: {
    backgroundColor: "white",
  },
  cardContent: {
    width: screenWidth,
    height: screenWidth,
  },
  optionText: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default OptionComponent;
