import { StyleSheet, StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, useTheme, Stack, H4, Text, View } from "tamagui";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./features/home";
import { Logo } from "./components/Logo";
import config from "../tamagui";
import { SurveyScreen } from "./features/survey";
import { CommentScreen } from "./features/comment";
import { MyScreen } from "./features/my";
import { ProfileScreen } from "./features/profile";
import { ResultScreen } from "./features/result";
import { useFonts } from "expo-font";
import { tamaguiFonts } from "../tamagui/tamaguiFonts.native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button } from "tamagui";
import { LogBox } from "react-native";
import { I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";

LogBox.ignoreLogs([
  `Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.`,
]);

import {
  User as ProfileIcon,
  CheckCircle as HomeIcon,
  Settings as MyIcon,
} from "@tamagui/lucide-icons";

import "@azure/core-asynciterator-polyfill";

import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
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

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Testy") {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === "Moje") {
            return <MyIcon size={size} color={color} />;
          } else if (route.name === "Profil") {
            // You can return any component that you like here!
            return <ProfileIcon size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Testy"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Moje"
        component={MyScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// const TopTabNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="home" screenOptions={screenOptions}>
//       <Drawer.Screen
//         component={Home}
//         key={"home"}
//         name={"home"}
//         options={{ title: "Home" }}
//       />
//       {/* <Drawer.Screen
//         name="item-detail"
//         component={SurveyScreen}
//         options={{
//           title: "User",
//         }}
//       />
//       <Drawer.Screen
//         name="comment"
//         component={CommentScreen}
//         options={{
//           title: "Komentarze",
//         }}
//       /> */}
//       <Drawer.Screen
//         name="profile"
//         component={ProfileScreen}
//         options={{
//           title: "Profile",
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const MainNavigator = () => {
//   return (
//     <NativeStack.Navigator>
//       {/* <NativeStack.Screen name="Home" component={Home} /> */}
//       <NativeStack.Screen name="Survey" component={SurveyScreen} />
//       <NativeStack.Screen name="Comment" component={CommentScreen} />
//     </NativeStack.Navigator>
//   );
// };

const linking = {
  prefixes: ["criszz77.github.io/luna", "localhost"],
  config: {
    screens: {
      Home: "",
      Survey: "survey/:id",
      Comment: "comment/:id",
      Result: "result/:id",
    },
  },
};

const InnerApp = () => {
  const colorScheme = "dark";
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
          <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Survey"
              component={SurveyScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Result"
              component={ResultScreen}
              // options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Comment"
              component={CommentScreen}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const MyAppHeader = () => {
  return (
    <View>
      <Text>My Header</Text>
    </View>
  );
};

I18n.putVocabularies(translations);
I18n.setLanguage("pl");
I18n.putVocabulariesForLanguage("pl", {
  "Enter your Password": "Wprowadź swoje hasło",
  "Forgot Password?": "Odzyskiwanie hasła",
  "Forgot your password?": "Chcesz odzyskać hasło?",
});

const App = () => {
  const theme = "dark";

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
            {/* <TaskProvider> */}
            <InnerApp />
            {/* </TaskProvider> */}
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
