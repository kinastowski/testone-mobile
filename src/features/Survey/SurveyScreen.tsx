import {
  Button,
  Paragraph,
  YStack,
  H2,
  H4,
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
import { useTaskContext } from "../../context/TaskContext";

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
  const { push } = useRouter();

  const [item, setItem] = useState<Item>();
  const [userTask, setUserTask] = useState<UserTask>();

  useEffect(() => {
    const fetchData = async () => {
      const ut = await DataStore.query(UserTask, id);
      const task = await DataStore.query(Task, ut.taskId);
      setUserTask(ut);
      setItem(task);
      const subscription = DataStore.observe(UserTask, id).subscribe((msg) => {
        console.log("ABCX", msg.model, msg.opType, msg.element);
        // setItem(msg.element);
      });
    };

    fetchData();
  }, [id]);

  if (!item) return null;

  async function saveResult(option: {
    value: string;
    type: string;
    result: number;
    rating?: number;
  }) {
    // console.log("Selected option: ", option);
    // const owner = (await Auth.currentAuthenticatedUser()).username;
    let res = null;
    if (userTask) {
      const original = await DataStore.query(UserTask, userTask.id);
      res = await DataStore.save(
        UserTask.copyOf(original, (updated) => {
          updated.result = {
            ...original.result,
            [option.result]: {
              id: option.result,
              rating: option.rating,
              comment: "",
            },
          };
        })
      );

      setUserTask(res);
    }

    // else {
    //   res = await DataStore.save(
    //     new UserTask({
    //       result: {
    //         [option.result]: {
    //           id: option.result,
    //           rating: option.rating,
    //           comment: "",
    //         },
    //       },
    //       taskId: id,
    //       // owner: `${owner}::${owner}`,
    //     })
    //   );
    // }
    // setUserTask(res);
    // push("/comment/" + res.id);
  }

  if (!userTask) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={1} jc="center" ai="center" space>
          {/* <Image src={{ uri: item.image }} width={460} height={220} /> */}
          {/*  */}
          <TimerComponent active={true} testId={id} />

          <H2 ta="center" p="$4" fontFamily={"$silkscreen"}>
            Witaj w Teście Konsumenckim!
          </H2>
          <H4 ta="center" p="$4" fontFamily={"$silkscreen"}>
            {item.title}
          </H4>
          <XStack px="$6" mb="$8">
            <Paragraph>
              {/* {item.details.description} */}
              Witaj w naszym teście konsumenckim! Twoja opinia ma dla nas
              ogromne znaczenie, dlatego chcielibyśmy Cię serdecznie przywitać i
              podziękować za udział w badaniu. Poniżej znajdziesz wszystkie
              dostępne warianty do oceny. Twoja zadanie polega na dokładnym
              zbadaniu każdego z nich, ocenie na pięciopunktowej skali
              gwiazdkowej oraz nagraniu krótkiej wypowiedzi, w której opiszesz
              swoje powody oceny. Ciesz się procesem oceny i pamiętaj, że Twoja
              opinia ma realny wpływ na to, co oferujemy. Dziękujemy za
              zaangażowanie!
            </Paragraph>
          </XStack>

          <Survey
            onConfirm={saveResult}
            options={item.details.options}
            userTaskId={userTask.id}
          />

          <Button {...linkProps} icon={ChevronLeft}>
            Wróc
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
