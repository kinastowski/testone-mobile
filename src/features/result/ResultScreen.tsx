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
import React, { useState, useEffect, use } from "react";
import { createParam } from "solito";
import { useLink } from "solito/link";
import { Audio } from "expo-av";
import { Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { UserTask, Task } from "../../models";

import { SafeAreaView } from "react-native";
// import { useTaskContext } from "../../context/TaskContext";
import { Activity, Airplay } from "@tamagui/lucide-icons";
import TimerComponent from "../../components/Timer";
import Result from "../../components/Result";
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
  const { push } = useRouter();

  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const fetchData = async () => {
      const task = await DataStore.query(Task, id);

      const userTask = await DataStore.query(UserTask, (c) => c.taskId.eq(id));

      setItem({
        task,
        userTask: userTask[0],
      });
    };

    fetchData();
  }, [id]);

  const deleteTask = async () => {
    try {
      // const toDelete = await DataStore.query(UserTask, id);
      if (item.userTask) {
        await DataStore.delete(item.userTask);
        console.log("Task successfully deleted!");
      }
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  if (!item) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={1} jc="center" ai="center" space>
          {/* <Image src={{ uri: item.image }} width={460} height={220} /> */}

          <TimerComponent
            active={false}
            testId={id}
            stats={item.userTask.stats}
          />

          <H2 ta="center" p="$4" fontFamily={"$silkscreen"}>
            {item.task.title}
          </H2>
          <XStack px="$6" mb="$8">
            <Paragraph ta="justify" fontFamily={"$silkscreen"}>
              {item.task.details.description}
            </Paragraph>
          </XStack>
          <Result
            // onConfirm={selectOption}
            options={item.task.details.options}
            result={item.userTask.result}
          />

          <Button {...linkProps} icon={ChevronLeft}>
            Go
          </Button>

          <Button
            onPress={async () => {
              await deleteTask();
              push("/");
            }}
          >
            Usuń
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export function ResultScreen() {
  const [id] = useParam("id");

  return <ItemDetail id={id} />;
}
