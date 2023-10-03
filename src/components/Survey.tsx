import React, { useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
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
import OptionComponent from "./Option";

interface SurveyOption {
  type: "text" | "image" | "video";
  value: string;
  result: number;
}

interface SurveyProps {
  options: SurveyOption[];
  result: number;
  onConfirm: (selectedOption: SurveyOption) => void;
}

interface SheetInfoProps {
  option: SurveyOption;
  open?: boolean;

  setOpen: (open: boolean) => void;
  onConfirm: (selectedOption: SurveyOption) => void;
}

function SheetInfo({
  option,
  open,
  setOpen,
  onConfirm,
  result,
}: SheetInfoProps) {
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
            <OptionComponent option={option} />
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

const Survey: React.FC<SurveyProps> = ({ options, onConfirm, result }) => {
  const [selectedOption, setSelectedOption] = useState<SurveyOption | null>(
    null
  );
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        {options.map((option, idx) => (
          <OptionComponent
            key={`option-${option.result}-${idx}`}
            option={option}
            onPress={() => {
              if (!result) {
                setSelectedOption(option);
                setShowConfirmSheet(true);
              }
            }}
          />
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
});

export default Survey;
