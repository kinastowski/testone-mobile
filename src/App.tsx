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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./features/Home";
import { Logo } from "./components/Logo";
import config from "../tamagui";
import { SurveyScreen } from "./features/Survey";
import { CommentScreen } from "./features/Comment";
import { SettingsScreen } from "./features/Settings";
import { ProfileScreen } from "./features/Profile";
import { useFonts } from "expo-font";
import { tamaguiFonts } from "../tamagui/tamaguiFonts.native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button } from "tamagui";

import {
  User as ProfileIcon,
  CheckCircle as HomeIcon,
  Settings as SettingsIcon,
} from "@tamagui/lucide-icons";

import "@azure/core-asynciterator-polyfill";

import awsExports from "./aws-exports";
// import { CommentScreen } from "./features/Comment";
import Survey from "./components/Survey";
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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === "Settings") {
            return <SettingsIcon size={size} color={color} />;
          } else if (route.name === "Profile") {
            // You can return any component that you like here!
            return <ProfileIcon size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
          <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <MainStack.Screen name="Survey" component={SurveyScreen} />
            <MainStack.Screen name="Comment" component={CommentScreen} />
          </MainStack.Navigator>
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
