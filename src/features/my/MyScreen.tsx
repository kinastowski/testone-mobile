import { useEffect, useState } from "react";
import {
  Anchor,
  Button,
  H1,
  H4,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack,
  Card,
  Text,
  CardProps,
  H2,
  ScrollView,
  styled,
} from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useLink } from "solito/link";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { SafeAreaView } from "react-native";
import { useRouter } from "solito/router";
import Image from "../../components/Image";
import { Activity } from "@tamagui/lucide-icons";
import { DataStore } from "aws-amplify";
import { UserTask, Task, User } from "../../models";
// import {sortBy} from "lodash";
import CountdownComponent from "../../components/Countdown";
import { Auth } from "aws-amplify";
import { useTaskContext } from "../../context/TaskContext";
import { Coins } from "@tamagui/lucide-icons";

interface Item {
  taskId: string;
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

interface SheetInfoProps {
  item: Item;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export const Title = styled(Card.Header, {
  name: "Title", // useful for debugging, and Component themes

  padding: "$2",
});

const StyledCard = styled(Card, {
  name: "StyledCard", // useful for debugging, and Component themes

  padding: "$4",
  marginBottom: "$4",
});

export function MyScreen() {
  // const { state, dispatch } = useTaskContext();
  const [active, setActive] = useState({});
  const [tasks, setTasks] = useState([]);
  const [coins, setCoins] = useState();

  const { push } = useRouter();
  let { user } = useAuthenticator();

  const showDetails = (item: Item) => {
    push("/result/" + item.id);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await DataStore.query(Task);

      const userTasks = await DataStore.query(UserTask);

      // console.log("userTasks", userTasks);

      const userTaskTaskIds = userTasks.map((userTask) => userTask.taskId);

      // Filter Tasks whose id is present in userTaskTaskIds
      const myTasks = tasks.filter((task) => userTaskTaskIds.includes(task.id));
      setTasks(myTasks);
      const result = await Auth.currentAuthenticatedUser();
      const c = (await Auth.currentAuthenticatedUser()).attributes[
        "custom:coins"
      ];
      setCoins(c);
    };

    fetchTasks();
  });

  const subscription1 = DataStore.observe(Task).subscribe((msg) => {
    console.log("subscription1", msg);
  });

  const subscription2 = DataStore.observe(
    UserTask,

    (c) => c.owner.eq(user.username)
  ).subscribe((msg) => {
    console.log("subscription2", msg);
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StyledCard
        elevate
        size="$1"
        animation="bouncy"
        size="$4"
        width="100%"
        height={160}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        onPress={async () => {
          try {
            await DataStore.clear();
            await DataStore.start();
          } catch (err) {}
        }}
      >
        <Title>
          <Text px="$1" fontFamily={"$silkscreen"}>
            Saldo konta
          </Text>
          <Button
            borderRadius="$8"
            size="$8"
            fontFamily={"$silkscreen"}
            mx="$6"
            my="$2"
            icon={<Coins size="$4" />}
            onPress={async () => {
              try {
                await DataStore.clear();
                await DataStore.start();
              } catch (err) {}
            }}
          >
            {coins}
          </Button>
          {/* <Paragraph theme="alt2" color="white">
                    {trimToMaxWords(props.item.description)}
                  </Paragraph> */}
        </Title>
        <Card.Footer padded>
          <XStack flex={1} />
        </Card.Footer>
        <Card.Background borderRadius="$4"></Card.Background>
      </StyledCard>
      <Text px="$4" fontFamily={"$silkscreen"}>
        Zrealizowane zadania
      </Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={0.5} ai="center" p="$6">
          {tasks &&
            tasks.reverse().map((item, idx) => (
              <StyledCard
                elevate
                size="$1"
                key={`taks-${idx}-${item.title}`}
                animation="bouncy"
                size="$6"
                width="100%"
                height={180}
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                onPress={() => showDetails(item)}
              >
                <Title>
                  <H4 color="white" fontFamily={"$silkscreen"}>
                    {item.title}
                  </H4>
                  {/* <Paragraph theme="alt2" color="white">
                    {trimToMaxWords(props.item.description)}
                  </Paragraph> */}
                </Title>
                <Card.Footer padded>
                  <XStack flex={1} />
                  <Button borderRadius="$8" onPress={() => showDetails(item)}>
                    Zobacz
                  </Button>
                </Card.Footer>
                <Card.Background borderRadius="$4">
                  <Image src={"tr:w-460,h-220/" + item.image} fill />
                  <XStack flex={1} backgroundColor="rgba(0,0,0,0.5)" />
                </Card.Background>
              </StyledCard>
            ))}

          {/* <SheetInfo item={active as Item} open={open} setOpen={setOpen} /> */}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
