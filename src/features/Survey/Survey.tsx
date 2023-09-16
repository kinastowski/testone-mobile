import {
  Button,
  Paragraph,
  YStack,
  H2,
  XStack,
  Circle,
  ScrollView,
  Text,
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

import { SafeAreaView } from "react-native";

import { Activity, Airplay } from "@tamagui/lucide-icons";
import TimerComponent from "../../components/Timer";
import Survey from "../../components/Survey";
import { useRouter } from "solito/router";

const { useParam } = createParam<{ id: string }>();
interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  constrains: {
    gender: string;
    age: number;
    location: string;
  };
  details: Record<string, unknown>;
}

interface ItemDetailProps {
  id: string;
}

function ItemDetail({ id }: ItemDetailProps) {
  const linkProps = useLink({ href: "/" });
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [userTaskId, setUserTaskId] = useState<string>();
  const { push } = useRouter();

  //  const goTo = () => {
  //    setShowCountDown(!showCountDown);
  //    setOpen(false);

  //    push("/item/" + item.id);
  //  };

  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await DataStore.query(Task, id);
      setItem(result);
    };

    fetchData();
  }, [id]);

  if (!item) return null;

  async function selectOption(option: { value: string; type: string }) {
    console.log("Selected option: ", option);
    const res = await DataStore.save(
      new UserTask({
        result: option.value,
        taskID: id,
        userID: (await Auth.currentAuthenticatedUser()).username,
      })
    );
    // setUserTaskId(res.id);
    push("/comment/" + res.id);
    // console.log("Saved result: ", res.id);
  }

  console.log("Item: ", item);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={1} jc="center" ai="center" space>
          {/* <Image src={{ uri: item.image }} width={460} height={220} /> */}

          <TimerComponent active={true} testId={id} />

          <H2 ta="center" p="$4" fontFamily={"$silkscreen"}>
            {item.title}
          </H2>
          <XStack px="$6" mb="$8">
            <Paragraph ta="justify" fontFamily={"$silkscreen"}>
              {item.details.description}
            </Paragraph>
          </XStack>
          <Survey onConfirm={selectOption} options={item.details.options} />

          <Button {...linkProps} icon={ChevronLeft}>
            Go Home
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export function SurveyScreen() {
  const [id] = useParam("id");

  return <ItemDetail id={id} />;
}
