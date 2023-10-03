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
import { UserTask, Task } from "../../models";
// import {sortBy} from "lodash";
import CountdownComponent from "../../components/Countdown";
import { Auth } from "aws-amplify";
import { useTaskContext } from "../../context/TaskContext";

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
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const showDetails = (item: Item) => {
    push("/result/" + item.id);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await DataStore.query(Task);

      const username = (await Auth.currentAuthenticatedUser()).username;
      const userTasks = await DataStore.query(UserTask);

      // console.log("userTasks", userTasks);

      const userTaskTaskIds = userTasks.map((userTask) => userTask.taskId);

      // Filter Tasks whose id is present in userTaskTaskIds
      const myTasks = tasks.filter((task) => userTaskTaskIds.includes(task.id));
      setTasks(myTasks);
    };

    fetchTasks();
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack f={0.5} ai="center" p="$6">
          {tasks &&
            tasks.map((item, idx) => (
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
                  <Image src={{ uri: item.image }} fill />
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
