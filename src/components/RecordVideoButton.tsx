import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Camera } from "expo-camera";
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
import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";

const RecordVideoButton = ({
  userTaskId,
  resultId,
}: {
  userTaskId: string;
  resultId: string;
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  const uploadVideo = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const user = await Auth.currentAuthenticatedUser();
      const fileName = `${user.username}_${userTaskId}_${resultId}_review.mp4`; // Customize the file path and name as needed

      const result = await Storage.put(fileName, blob, {
        contentType: "video/mp4", // Set content type to video
      });

      console.log("Upload successful:", result);
      return result;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const handleRecord = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissions Denied",
        "You need to grant camera permissions to record a video."
      );
      return;
    }

    if (cameraRef.current) {
      if (isRecording) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } else {
        setIsRecording(true);
        try {
          const video = await cameraRef.current.recordAsync();
          console.log(video.uri);
          // After recording, upload the video
          await uploadVideo(video.uri);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Failed to record video.");
        } finally {
          setIsRecording(false);
        }
      }
    }
  };

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Camera ref={cameraRef}>
        <Button
          onPress={handleRecord}
          size="$4"
          disabled={userTaskId === null}
          // icon={PlayCircle}
        >
          <Circle
            size={20}
            backgroundColor={isRecording ? "red" : "green"}
            elevation="$4"
          />
          <Text>
            {isRecording
              ? "Zatrzymaj nagrywanie video"
              : "Rozpocznij nagrywanie video"}
          </Text>
        </Button>
      </Camera>
    </YStack>
  );
};
export default RecordVideoButton;
