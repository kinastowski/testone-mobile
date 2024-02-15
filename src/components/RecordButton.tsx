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
import { UserTask, Task } from "../models";
import { SafeAreaView, StyleSheet, View } from "react-native";

function RecordButton({
  userTaskId,
  resultId,
}: {
  userTaskId: string;
  resultId: string;
}) {
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [showCountDown, setShowCountDown] = useState(false);

  //   const [item, setItem] = useState<Item>();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await DataStore.query(UserTask, id);

  //       setItem(result);
  //     };

  //     fetchData();
  //   }, [id]);

  //   if (!item) return null;

  async function startRecording() {
    try {
      console.log("Requesting permissions...");
      const { status } = await Audio.getPermissionsAsync();
      if (status !== "granted") {
        await Audio.requestPermissionsAsync();
      }
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Permissions granted", status);

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording...", err);
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
        await Storage.remove(
          `${user.username}_${userTaskId}_${resultId}_review.m4a`
        );
      } catch (error) {}

      await Storage.put(
        `${user.username}_${userTaskId}_${resultId}_review.m4a`,
        blob,
        {
          contentType: "audio/m4a",
        }
      );
      console.log("Recording stopped and stored successfully");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setRecording(undefined);
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Button
        onPress={recording ? stopRecording : startRecording}
        size="$4"
        disabled={userTaskId === null}
        // icon={PlayCircle}
      >
        <Circle
          size={20}
          backgroundColor={recording ? "red" : "green"}
          elevation="$4"
        />
        <Text>
          {recording
            ? "Zatrzymaj nagrywanie audio"
            : "Rozpocznij nagrywanie audio"}
        </Text>
      </Button>
    </YStack>
  );
}

export default RecordButton;
