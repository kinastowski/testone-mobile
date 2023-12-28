import React, { use, useEffect, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Button,
  ScrollView,
  Sheet,
  Text,
  XStack,
  H2,
  H4,
  Paragraph,
} from "tamagui";
import Image from "./Image";
import { Video } from "expo-av";
import {
  Activity,
  Airplay,
  ChevronsRight,
  ChevronsLeft,
} from "@tamagui/lucide-icons";
import OptionComponent from "./Option";
import StarRating from "react-native-star-rating-widget";
import RecordButton from "./RecordButton";
import { SafeAreaView } from "react-native";

interface SurveyOption {
  type: "text" | "image" | "video";
  value: string;
  result: number;
  rating?: number;
  id: string;
}

interface SurveyProps {
  options: SurveyOption[];
  result: number;
  userTaskId: string;
  onConfirm: (selectedOption: SurveyOption) => void;
}

interface SheetInfoProps {
  option: SurveyOption;
  userTaskId: string;
  open?: boolean;

  setOpen: (open: boolean) => void;
  saveResult: (selectedOption: SurveyOption) => void;
  goNext: () => void;
}

function StepHeader({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <H4 ta="center" px="$4" fontFamily={"$silkscreen"}>
        Krok {num}. {title}
      </H4>
      <Text px="$4">{description}</Text>
    </>
  );
}

function SheetInfo({
  option,
  open,
  setOpen,
  saveResult,
  userTaskId,
  goNext,
}: SheetInfoProps) {
  const [position, setPosition] = useState(0);
  const [rating, setRating] = useState(0);
  const [test, setTest] = useState(0);
  const [step, setStep] = useState(1);

  const changeRating = (newRating: number) => {
    setRating(newRating);
    saveResult({
      ...option,
      rating: newRating,
    });
  };

  const changeStep = (move: number) => {
    console.log("step", step);
    if (step === 3 && move === 1) {
      setStep(1);
      goNext();
      return;
    }

    setStep(step + move < 1 ? 1 : step + move > 3 ? 1 : step + move);
  };

  useEffect(() => {
    setRating(0);
    setPosition(0);
  }, [option]);

  console.log("option", option);
  if (!option) return null;

  const backDisabled = step === 1;
  // const nextDisabled = () => {
  //   return true;
  // };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[92]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />

        <Sheet.Frame ai="center">
          <Sheet.Handle />

          <H2 ta="center" px="$4" fontFamily={"$silkscreen"}>
            Zbadaj Wariant
          </H2>
          <Text px="$4">
            Prosimy o dokładne zbadanie przedstawionego wariantu. Upewnij się,
            że zrozumiałeś lub zobaczyłeś wszystkie szczegóły. Teraz jest czas
            na Twoją uwagę i dokładność.
          </Text>

          <XStack mt="$6">
            <OptionComponent option={option} />
          </XStack>
          {step === 1 && (
            <>
              <StepHeader
                num="1"
                title="Ocena Wariantu"
                description="Proszę ocenić go na pięciopunktowej skali gwiazdkowej, gdzie 1 oznacza bardzo negatywną ocenę, a 5 oznacza bardzo pozytywną ocenę. Możesz również używać połówek gwiazdek, jeśli uważasz, że ocena jest bardziej precyzyjna."
              />

              <XStack mt="$6">
                <StarRating rating={rating} onChange={changeRating} />
              </XStack>
            </>
          )}

          {step === 2 && (
            <>
              <StepHeader
                num="2"
                title="Nagranie Motywacji"
                description="Chcielibyśmy teraz poznać Twoje powody oceny wariantu. Proszę nagrać krótką wypowiedź (maksymalnie 10 sekund), w której opiszesz, dlaczego przyznałeś określoną ocenę. Twoja opinia jest dla nas bardzo ważna, więc bądź jak najbardziej szczery i wyraźny."
              />
              <XStack mt="$6">
                <RecordButton
                  userTaskId={userTaskId}
                  resultId={option.result}
                />
              </XStack>
            </>
          )}
          {step === 3 && (
            <>
              <StepHeader
                num="3"
                title="Kolejny Wariant"
                description="Dziękujemy za Twoją opinię na temat tego wariantu. Teraz możesz przejść do oceny kolejnego wariantu, klikając przycisk Dalej. Twoja opinia pomoże nam lepiej zrozumieć Twoje preferencje i potrzeby konsumenckie."
              />
            </>
          )}
          <XStack mt="$6">
            <Button
              onPress={() => changeStep(-1)}
              disabled={backDisabled}
              icon={ChevronsLeft}
            >
              Wróć
            </Button>
            <Button ml="$2" onPress={() => setOpen(false)}>
              Zamknij
            </Button>

            <Button
              ml="$8"
              size="$6"
              onPress={() => changeStep(1)}
              // disabled={nextDisabled}
              themeInverse
              iconAfter={ChevronsRight}
            >
              Dalej
            </Button>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </ScrollView>
  );
}

const Survey: React.FC<SurveyProps> = ({
  options,
  onConfirm,
  result,
  userTaskId,
  taskId,
}) => {
  const [selectedOption, setSelectedOption] = useState<SurveyOption | null>(
    null
  );
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [suffledOptions, setSuffledOptions] = useState(options);

  useEffect(() => {
    function shuffleArray(array: SurveyOption[]) {
      for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index (0 <= j <= i)
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    setSuffledOptions(shuffleArray([...options]));
  }, [options]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {suffledOptions.map((option, idx) => (
            <OptionComponent
              key={`option-${option.result}-${idx}`}
              option={option}
              taskId={taskId}
              onPress={() => {
                if (!result) {
                  setSelectedOption(option);
                  setShowConfirmSheet(true);
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
      <Button
        size="$6"
        onPress={() => {
          setSelectedOption(suffledOptions[0]);
          setShowConfirmSheet(true);
        }}
        themeInverse
        iconAfter={Activity}
      >
        Oceń warianty
      </Button>
      <SheetInfo
        option={selectedOption}
        userTaskId={userTaskId}
        open={showConfirmSheet}
        setOpen={() => setShowConfirmSheet(false)}
        saveResult={async (item) => {
          // setShowConfirmSheet(false);
          await onConfirm(item);
        }}
        goNext={() => {
          setShowConfirmSheet(false);
          const currentIndex = suffledOptions.findIndex(
            (element) => element.result === selectedOption?.result
          );
          if (currentIndex === -1) {
            return null;
          }
          if (currentIndex === suffledOptions.length - 1) {
            setSelectedOption(suffledOptions[0]);
          } else {
            setSelectedOption(suffledOptions[currentIndex + 1]);
          }
          if (selectedOption) {
            setShowConfirmSheet(true);
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Survey;
