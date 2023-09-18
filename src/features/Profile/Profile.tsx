import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { SafeAreaView, StyleSheet } from "react-native";
import Profile from "../../components/Profile";
interface ItemDetailProps {
  id: string;
}

function ItemDetail({ id }: ItemDetailProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Profile userID={id} />
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

  return <ItemDetail id={user.username} />;
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
