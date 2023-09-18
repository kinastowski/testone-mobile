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

interface DemoCardProps extends CardProps {
  item: Item;
}

export const Title = styled(Card.Header, {
  name: "Title", // useful for debugging, and Component themes

  padding: "$2",
  borderRadius: "$4",
});

export function DemoCard(props: DemoCardProps) {
  const trimToMaxWords = (text: string, maxChars = 100) => {
    if (text.length <= maxChars) return text;

    let trimmed = text.substr(0, maxChars);
    let lastSpace = trimmed.lastIndexOf(" ");

    if (lastSpace === -1) return text;
    return trimmed.substr(0, lastSpace) + " ...";
  };

  return (
    <Card elevate size="$1" bordered {...props}>
      <Title>
        <H4 color="white" fontFamily={"$silkscreen"}>
          {props.item.title}
        </H4>
        {/* <Paragraph theme="alt2" color="white">
          {trimToMaxWords(props.item.description)}
        </Paragraph> */}
      </Title>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$8" onPress={props.onPress}>
          Zobacz
        </Button>
      </Card.Footer>
      <Card.Background>
        <Image src={{ uri: props.item.image }} fill />
        <XStack flex={1} backgroundColor="rgba(0,0,0,0.5)" />
      </Card.Background>
    </Card>
  );
}

export function Home() {
  const [active, setActive] = useState({});
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const showDetails = (item: Item) => {
    setActive(item);
    setOpen(true);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await DataStore.query(Task);

        setTasks(tasks);
      } catch (error) {
        console.log("Error retrieving posts", error);
      }
    };

    getTasks();
  }, []);

  // const items: Item[] = [
  //   {
  //     id: 1,
  //     title: "Test produktu Nivea",
  //     description:
  //       "Test konsumenckiego dla nowego kremu do ciała przeprowadzony był na grupie 100 osób w wieku od 20 do 60 lat. Uczestnicy przez okres czterech tygodni stosowali produkt, obserwując jego działanie oraz ewentualne efekty na skórze. Wyniki testu miały na celu określenie skuteczności nawilżania, szybkości wchłaniania oraz ogólnej satysfakcji z użytkowania produktu.",
  //     image: "https://ik.imagekit.io/64e8hixka/tr:w-460,h-220/nivea.jpg",
  //     constrains: {
  //       gender: "male",
  //       age: 18,
  //       location: "New York",
  //     },
  //     details: {},
  //   },
  //   {
  //     id: "2",
  //     title: "Nowa Coca-cola",
  //     description:
  //       "Test konsumencki dla nowego napoju został przeprowadzony wśród 150 osób w wieku od 18 do 50 lat. Przez dwa tygodnie uczestnicy regularnie degustowali produkt, oceniając jego smak, aromat oraz uczucie po spożyciu. Celem testu było ustalenie preferencji smakowych, poziomu orzeźwienia oraz ogólnego zadowolenia z nowego napoju.",
  //     image: "https://ik.imagekit.io/64e8hixka/tr:w-460,h-220/cola.jpg",
  //     constrains: {
  //       gender: "male",
  //       age: 18,
  //       location: "New York",
  //     },
  //     details: {},
  //   },
  //   {
  //     id: "3",
  //     title: "Nowa marka kawy - Lavazza",
  //     description:
  //       "Test konsumencki dla nowej marki kawy został przeprowadzony wśród 200 osób w wieku od 25 do 65 lat. Uczestnicy przez trzy tygodnie regularnie parzyli i degustowali kawę, oceniając jej aromat, smak oraz siłę naparu. Celem testu było zrozumienie, jak nowa marka porównuje się z konkurencją pod względem jakości, intensywności smaku oraz ogólnej satysfakcji z picia.",
  //     image: "https://ik.imagekit.io/64e8hixka/tr:w-460,h-220/coffe.jpeg",
  //     constrains: {
  //       gender: "male",
  //       age: 18,
  //       location: "New York",
  //     },
  //     details: {},
  //   },
  //   {
  //     id: "4",
  //     title: "Nazwa dla produktu: Karma dla psa",
  //     description:
  //       "Test konsumencki dla nowej marki karmy dla psów został przeprowadzony na grupie 120 właścicieli psów różnych ras i wielkości. Przez cztery tygodnie zwierzęta były karmione wyłącznie tym produktem, a ich opiekunowie obserwowali i oceniali akceptację karmy przez psy, jej wpływ na kondycję zwierząt oraz ewentualne zmiany w ich zdrowiu i zachowaniu. ",
  //     image: "https://ik.imagekit.io/64e8hixka/tr:w-460,h-220/dog.jpeg",
  //     constrains: {
  //       gender: "male",
  //       age: 18,
  //       location: "New York",
  //     },
  //     details: {},
  //   },
  // ];

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
        <YStack f={0.5} ai="center" p="$2">
          {tasks &&
            tasks.map((item, idx) => (
              <DemoCard
                key={`taks=${idx}`}
                item={item}
                animation="bouncy"
                size="$6"
                width="100%"
                height={200}
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                onPress={() => showDetails(item)}
              />
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

  const goTo = () => {
    setShowCountDown(!showCountDown);
    setOpen(false);

    push("/survey/" + item.id);
  };

  return (
    <>
      {/* <Button
        aria-label={"toggle-sheet-button"}
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen(!open)}
      /> */}

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
              onCoutdownEnd={() => {
                setShowCountDown(false);
                goTo();
              }}
            />
          )}
          <Image src={{ uri: item.image }} width={460} height={220} />
          <Sheet.Handle />

          <H2 ta="center" p="$4" fontFamily={"$silkscreen"}>
            {item.title}
          </H2>
          <XStack px="$6" mb="$8">
            <Paragraph ta="justify">{item.description}</Paragraph>
          </XStack>
          {/* <Button
            size="$6"
            circular
            icon={ChevronDown}
            aria-label={"close-sheet-button"}
            onPress={() => {
              setOpen(false);
            }}
          /> */}
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
