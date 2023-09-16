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
import Image from "./Image";
import { Video } from "expo-av";
import { Activity, Airplay } from "@tamagui/lucide-icons";
const screenWidth = Dimensions.get("window").width - 100;

interface SurveyOption {
  type: "text" | "image" | "video";
  value: string;
}

interface SurveyProps {
  options: SurveyOption[];
  onConfirm: (selectedOption: SurveyOption) => void;
}

interface SheetInfoProps {
  option: SurveyOption;
  open?: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (selectedOption: SurveyOption) => void;
}

const renderOption = (option: SurveyOption) => {
  switch (option.type) {
    case "text":
      return <Text style={styles.optionText}>{option.value}</Text>;
    case "image":
      return <Image src={{ uri: option.value }} style={styles.cardContent} />;
    case "video":
      return (
        <Video
          source={{ uri: option.value }}
          style={styles.cardContent}
          useNativeControls
        />
      );
    default:
      return null;
  }
};

function SheetInfo({ option, open, setOpen, onConfirm }: SheetInfoProps) {
  const [position, setPosition] = useState(0);

  return (
    <>
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />

        <Sheet.Frame ai="center">
          <Sheet.Handle />
          <H2 ta="center" p="$4" fontFamily={"$silkscreen"}>
            Potwierdź Twój wybór
          </H2>
          <XStack mt="$6">
            <View style={styles.card}>{option && renderOption(option)}</View>
          </XStack>
          <XStack>
            <Button
              onPress={() => onConfirm(option)}
              alignSelf="center"
              icon={Activity}
              size="$6"
            >
              Potwierdź
            </Button>
          </XStack>
          <XStack mt="$6">
            <Button onPress={() => setOpen(false)}>Wróć</Button>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

const Survey: React.FC<SurveyProps> = ({ options, onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState<SurveyOption | null>(
    null
  );
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedOption(option);
              setShowConfirmSheet(true);
            }}
          >
            <View style={styles.card}>{renderOption(option)}</View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SheetInfo
        option={selectedOption}
        open={showConfirmSheet}
        setOpen={() => setShowConfirmSheet(false)}
        onConfirm={async (item) => {
          setShowConfirmSheet(false);
          await onConfirm(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    borderRadius: 20,
  },
  cardContent: {
    width: screenWidth,
    height: screenWidth,
  },
  optionText: {
    fontSize: 24,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Survey;
