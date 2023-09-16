import { StyleSheet, StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, useTheme, Stack, H4 } from "tamagui";
import { SolitoImageProvider } from "solito/image";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerNavigationOptions,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import { Home } from "./features/Home";
import { Logo } from "./components/Logo";
import config from "../tamagui";
import { SurveyScreen } from "./features/Survey";
import { CommentScreen } from "./features/Comment";
import { useFonts } from "expo-font";
import { tamaguiFonts } from "../tamagui/tamaguiFonts.native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button } from "tamagui";
import "@azure/core-asynciterator-polyfill";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const Drawer = createDrawerNavigator();
function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign Out</Button>;
}

const Header = ({ route }: DrawerHeaderProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <DrawerToggleButton tintColor={theme.color?.val} />
      <Stack ai="center" jc={"space-between"} fd={"row"} f={1}>
        {/* <Logo /> */}
        <H4 fontFamily={"$silkscreen"} pr={"$7"}>
          {route.name.toUpperCase()}
        </H4>
        <SignOutButton />
      </Stack>
    </SafeAreaView>
  );
};

const screenOptions: DrawerNavigationOptions = {
  header: (props) => <Header {...props} />,
};

const TopTabNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="home" screenOptions={screenOptions}>
      <Drawer.Screen
        component={Home}
        key={"home"}
        name={"home"}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="item-detail"
        component={SurveyScreen}
        options={{
          title: "User",
        }}
      />
      <Drawer.Screen
        name="comment"
        component={CommentScreen}
        options={{
          title: "User",
        }}
      />
    </Drawer.Navigator>
  );
};

const linking = {
  prefixes: ["criszz77.github.io/luna", "localhost"],
  config: {
    screens: {
      home: "",
      "item-detail": "item/:id",
      comment: "comment/:id",
    },
  },
};

const InnerApp = () => {
  const colorScheme = useColorScheme() || "light";
  const isDarkMode = colorScheme === "dark";
  const theme = useTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          backgroundColor={theme.borderColor?.val}
          barStyle={isDarkMode ? "light-content" : "dark-content"}
        />
        <NavigationContainer
          theme={isDarkMode ? DarkTheme : DefaultTheme}
          linking={linking}
        >
          <TopTabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const App = () => {
  const theme = useColorScheme() || "light";

  const [loaded] = useFonts(tamaguiFonts);

  if (!loaded) {
    return null;
  }

  return (
    <Authenticator.Provider>
      <Authenticator>
        <SolitoImageProvider nextJsURL="https://luna-gamma.vercel.app/">
          <TamaguiProvider
            config={config}
            disableInjectCSS
            defaultTheme={theme}
          >
            <InnerApp />
          </TamaguiProvider>
        </SolitoImageProvider>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    height: 50,
    width: 50,
  },
  routeName: {
    flex: 1,
    textAlign: "right",
    marginRight: 15,
  },
});

export default App;
