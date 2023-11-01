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
// import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { SafeAreaView } from "react-native";
import { useRouter } from "solito/router";
import Image from "../../components/Image";
import { Activity } from "@tamagui/lucide-icons";
import { DataStore } from "aws-amplify";
import { UserTask, Task } from "../../models";
// import {sortBy} from "lodash";
import CountdownComponent from "../../components/Countdown";
import { useTaskContext } from "../../context/TaskContext";
import { Auth } from "aws-amplify";

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

export function HomeScreen() {
  // const { state, dispatch } = useTaskContext();
  const [active, setActive] = useState({});
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const showDetails = (item: Item) => {
    setActive(item);
    setOpen(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await DataStore.query(Task);

      // const username = (await Auth.currentAuthenticatedUser()).username;
      const userTasks = await DataStore.query(UserTask);

      const userTaskTaskIds = userTasks.map((userTask) => userTask.taskId);

      const otherTasks = tasks.filter(
        (task) => !userTaskTaskIds.includes(task.id)
      );

      // // Filter Tasks whose id is present in userTaskTaskIds
      // const filteredTasks = tasks.filter((task) =>
      //   userTaskTaskIds.includes(task.id)
      // );

      setTasks(otherTasks);
    };

    fetchTasks();
  });

  const onPress = () => {
    push("/survey/1");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Button
          borderRadius="$8"
          onPress={async () => {
            try {
              await DataStore.clear();
              await DataStore.start();
            } catch (err) {}
          }}
        >
          Odswieź
        </Button>

        <YStack f={0.5} ai="center" p="$6">
          {tasks &&
            tasks.map((item, idx) => (
              <StyledCard
                elevate
                size="$1"
                key={`taks=${idx}`}
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

          <SheetInfo item={active as Item} open={open} setOpen={setOpen} />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

function SheetInfo({ item, open, setOpen }: SheetInfoProps) {
  const [position, setPosition] = useState(0);
  // const linkProps = useLink({
  //   href: "/item/" + item.id,
  // });
  const { push } = useRouter();
  const [showCountDown, setShowCountDown] = useState<boolean>(false);

  const startUserTest = async () => {
    setShowCountDown(!showCountDown);
    setOpen(false);

    const res = await DataStore.save(
      new UserTask({
        taskId: item.id,
        // owner: `${owner}::${owner}`,
      })
    );

    console.log("res", res);

    push("/survey/" + res.id);
  };

  return (
    <>
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />

        <Sheet.Frame ai="center">
          {showCountDown && (
            <CountdownComponent
              duration={1}
              onCoutdownEnd={async () => {
                setShowCountDown(false);
                await startUserTest();
              }}
            />
          )}
          <Image
            src={{ uri: "tr:w-460,h-220/" + item.image }}
            width={460}
            height={220}
          />
          <Sheet.Handle />

          <H2 ta="center" p="$4" fontFamily={"$silkscreen"}>
            {item.title}
          </H2>
          <XStack px="$6" mb="$8">
            <Paragraph ta="justify">{item.description}</Paragraph>
          </XStack>

          <XStack>
            <Button
              onPress={() => setShowCountDown(true)}
              alignSelf="center"
              icon={Activity}
              size="$6"
            >
              Rozpocznij test
            </Button>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
