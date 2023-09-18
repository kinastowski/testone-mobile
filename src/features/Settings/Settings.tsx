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
  H5,
  Separator,
  SizableText,
  Tabs,
  TabsContentProps,
  isWeb,
} from "tamagui";
import { ChevronLeft, Timer } from "@tamagui/lucide-icons";
import React, { useState, useEffect, use } from "react";
import { createParam } from "solito";
import { useLink } from "solito/link";
import { Audio } from "expo-av";
import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { User } from "../../models";
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
  result: string;
}

interface ItemDetailProps {
  id: string;
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  );
};

function ItemDetail({ id }: ItemDetailProps) {
  const linkProps = useLink({ href: "/" });
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [showCountDown, setShowCountDown] = useState(false);

  const [item, setItem] = useState<Item>();

  const subscription = DataStore.observe(User, id).subscribe((msg) => {
    // console.log(msg.model, msg.opType, msg.element);
    setItem(msg.element);
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await DataStore.query(User, id);

      setItem(result);
    };

    fetchData();
  }, [id]);

  if (!item) return null;

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
      <Tabs
        defaultValue="tab1"
        flexDirection="row"
        orientation="vertical"
        width={400}
        borderRadius="$4"
        borderWidth="$0.25"
        overflow="hidden"
        borderColor="$borderColor"
      >
        <Tabs.List
          disablePassBorderRadius="end"
          aria-label="Manage your account"
          separator={<Separator />}
        >
          <Tabs.Tab value="tab1">
            <SizableText>Profile</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="tab2">
            <SizableText>Connections</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="tab3">
            <SizableText>Notifications</SizableText>
          </Tabs.Tab>
        </Tabs.List>
        <Separator vertical />
        <TabsContent value="tab1">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <YStack f={1} jc="center" ai="center" space>
              {/* <Image src={{ uri: item.image }} width={460} height={220} /> */}

              {/* <TimerComponent active={true} testId={id} /> */}
              {item.username}

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
        </TabsContent>
        <TabsContent value="tab2">
          <H5 textAlign="center">Connections</H5>
        </TabsContent>
        <TabsContent value="tab3">
          <H5 textAlign="center">Notifications</H5>
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
}

export function SettingsScreen() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Auth.currentAuthenticatedUser();
      setUser(result);
    };

    fetchData();
  }, []);

  if (!user) return null;

  return <ItemDetail id={user.username} />;
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
