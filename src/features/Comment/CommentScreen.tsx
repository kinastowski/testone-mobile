import {
  Button,
  Paragraph,
  YStack,
  H2,
  XStack,
  Circle,
  ScrollView,
  Text,
  TextArea,
} from "tamagui";
import { ChevronLeft, Timer } from "@tamagui/lucide-icons";
import React, { useState, useEffect } from "react";
import { createParam } from "solito";
import { useLink } from "solito/link";
import { Audio } from "expo-av";
import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { UserTask, Task } from "../../models";
// import { PlayCircle } from "@tamagui/lucide-icons";
import { SafeAreaView, StyleSheet } from "react-native";

import TimerComponent from "../../components/Timer";

import CountdownComponent from "../../components/Countdown";

const { useParam } = createParam<{ id: string }>();
interface Item {
  id: string;
  comment: string;
  stats: string;
  _version: number;
  _lastChangedAt: number;
  _deleted: boolean;
  createdAt: string;
  updatedAt: string;
  result: number;
}

interface ItemDetailProps {
  id: string;
}

function ItemDetail({ id }: ItemDetailProps) {
  const linkProps = useLink({ href: "/" });
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [showCountDown, setShowCountDown] = useState(false);

  const [item, setItem] = useState<Item>();

  const subscription = DataStore.observe(UserTask, id).subscribe((msg) => {
    // console.log(msg.model, msg.opType, msg.element);
    setItem(msg.element);
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await DataStore.query(UserTask, id);

      setItem(result);
    };

    fetchData();
  }, [id]);

  if (!item) return null;

  async function startRecording() {
    try {
      console.log("Requesting permissions.........");
      const { status } = await Audio.getPermissionsAsync();
      if (status !== "granted") {
        await Audio.requestPermissionsAsync();
      }
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    const user = await Auth.currentAuthenticatedUser();

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      try {
        await Storage.remove(`${id}_${user.username}.review.m4a`);
      } catch (error) {}

      await Storage.put(`${id}_${user.username}.review.m4a`, blob, {
        contentType: "audio/m4a",
      });
      console.log("Recording stopped and stored successfully");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setRecording(undefined);
    console.log("Recording stopped and stored at", uri);
  }

  function goTo() {
    // setShowCountDown(!showCountDown);
    // setOpen(false);
    // push("/item/" + item.id);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={1} jc="center" ai="center" space>
          {/* <Image src={{ uri: item.image }} width={460} height={220} /> */}

          {/* <TimerComponent active={true} testId={id} /> */}

          <Button
            onPress={recording ? stopRecording : startRecording}
            size="$8"
            // icon={PlayCircle}
          >
            <Circle
              size={20}
              backgroundColor={recording ? "red" : "green"}
              elevation="$4"
            />
            <Text>{recording ? "Stop Recording" : "Start Recording"}</Text>
          </Button>

          {showCountDown && (
            <CountdownComponent
              duration={1}
              onCoutdownEnd={() => {
                setShowCountDown(false);
                // goTo();
              }}
            />
          )}

          <TextArea
            placeholder="Enter your details..."
            height="50%"
            width="80%"
            mx="$4"
          >
            {item?.comment}
          </TextArea>

          <Button {...linkProps} icon={ChevronLeft}>
            Go Home
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export function CommentScreen() {
  const [id] = useParam("id");

  return <ItemDetail id={id} />;
}

const styles = StyleSheet.create({
  count: {
    fontSize: 40,
    color: "white",
    fontFamily: "Silkscreen",
  },
  count2: {
    fontSize: 60,
    color: "black",
    fontFamily: "Silkscreen",
  },
});
