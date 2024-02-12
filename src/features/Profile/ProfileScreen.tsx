import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { SafeAreaView, StyleSheet } from "react-native";
import Profile from "../../components/Profile";
import { Button } from "@aws-amplify/ui-react-native/dist/primitives";
interface ItemDetailProps {
  profile: string;
}

function ItemDetail({ profile }: ItemDetailProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Profile profileId={profile} />
    </SafeAreaView>
  );
}

export function ProfileScreen() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Auth.currentAuthenticatedUser();
      setUser(result);
    };

    fetchData();
  }, []);

  if (!user) return null;
  // console.log(user);

  return <ItemDetail profile={user.attributes.profile} />;
}

const styles = StyleSheet.create({
  count: {
    fontSize: 40,
    color: "white",
    fontFamily: "Silkscreen",
  },
  count2: {
    fontSize: 60,
    color: "black",
    fontFamily: "Silkscreen",
  },
});
