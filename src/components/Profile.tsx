import React, { useState, useEffect } from "react";
import {
  Text,
  TextArea,
  ScrollView,
  Button,
  XStack,
  YStack,
  ZStack,
  Label,
} from "tamagui";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";
import Slider from "./Slider";
import Radio from "./Radio";
import SelectIt from "./Select";
import { Auth } from "aws-amplify";

type ProfileData = {
  age: number;
  gender: string;
  edu: string;
  income: number;
  people: number;
  city: number;
};

type UserData = {
  id: string;
  profile: ProfileData; // Since this is stored as stringified JSON in the datastore
};

interface ProfileProps {
  profileId: string;
}

const Profile: React.FC<ProfileProps> = ({ profileId }) => {
  const [profile, setProfile] = useState<ProfileData>();
  const [hasProfile, setHasProfile] = useState<boolean>(false);

  const saveProfile = async (prof) => {
    try {
      if (hasProfile) {
        const original = await DataStore.query(User, profileId);
        await DataStore.save(
          User.copyOf(original, (updated) => {
            updated.profile = JSON.stringify(prof);
          })
        );
      } else {
        const result = await DataStore.save(
          new User({
            profile: JSON.stringify(prof),
          })
        );
        console.log(result);
        setHasProfile(true);
        await updateUserAttributes(result.id);
        setProfile(result.profile);
      }

      // alert("Profile information saved!");
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  const updateProfile = async (name: string, value: string | number) => {
    // console.log("updateProfile", name, value);
    setProfile({
      ...profile,
      [name]: value,
    });
    await saveProfile({
      ...profile,
      [name]: value,
    });
  };

  async function updateUserAttributes(profileId: string) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
        profile: profileId,
      });
      console.log(result); // SUCCESS
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData: UserData | undefined = await DataStore.query(
          User,
          profileId
        );

        setProfile(
          userData.profile || {
            gender: "none",
            age: "none",
            edu: "none",
            income: "none",
            people: "none",
            city: "none",
          }
        );
        setHasProfile(true);
        console.log("profile", profile, userData.profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [profileId]);

  if (!profile) return null;

  return (
    <ScrollView p="$6" contentContainerStyle={{ flexGrow: 1 }}>
      <YStack pt="$2">
        <SelectIt
          label={"Wiek"}
          items={[
            {
              label: "Nie podano",
              value: "none",
            },
            {
              label: "do 18",
              value: "age18",
            },
            {
              label: "18-35",
              value: "age35",
            },
            {
              label: "35-50",
              value: "age50",
            },
            {
              label: "50-70",
              value: "age70",
            },
            {
              label: "ponad 70",
              value: "age99",
            },
          ]}
          onValueChange={async (val) => await updateProfile("age", val)}
          name="age"
          value={profile && profile.age ? profile.age : "none"}
        />
      </YStack>
      <YStack pt="$6">
        <SelectIt
          label={"Płeć"}
          items={[
            {
              label: "Nie podano",
              value: "none",
            },
            {
              label: "Kobieta",
              value: "woman",
            },
            {
              label: "Mężczyźna",
              value: "man",
            },
          ]}
          onValueChange={async (val) => await updateProfile("gender", val)}
          name="gender"
          value={profile && profile.gender ? profile.gender : "none"}
        />
      </YStack>

      <YStack pt="$6">
        <SelectIt
          label={"Wykształecenie"}
          items={[
            {
              label: "Nie podano",
              value: "none",
            },
            {
              label: "Podstawowe",
              value: "low",
            },
            {
              label: "Średnie",
              value: "middlw",
            },
            {
              label: "Wyższe",
              value: "high",
            },
          ]}
          onValueChange={async (val) => await updateProfile("edu", val)}
          name="edu"
          value={profile && profile.edu ? profile.edu : "none"}
        />
      </YStack>

      <YStack pt="$6">
        <SelectIt
          label={"Śr. mies. przychód"}
          items={[
            {
              label: "Nie podano",
              value: "none",
            },
            {
              label: "do 4 tys. PLN",
              value: "income4",
            },
            {
              label: "4 - 8 tys. PLN",
              value: "income8",
            },
            {
              label: "8 - 16 tyś PLN",
              value: "income16",
            },
            {
              label: "powyżej 16 tyś PLN",
              value: "income99",
            },
          ]}
          onValueChange={async (val) => await updateProfile("income", val)}
          name="income"
          value={profile && profile.income ? profile.income : "none"}
        />
      </YStack>

      <YStack pt="$6">
        <SelectIt
          label={"Liczba osób w gosp. domowym"}
          items={[
            {
              label: "Nie podano",
              value: "none",
            },
            {
              label: "1 - 3 os. w gosp.",
              value: "people3",
            },
            {
              label: "3-5 os. w gosp.",
              value: "people5",
            },
            {
              label: "powyżej 5 os. w gosp.",
              value: "people9",
            },
          ]}
          onValueChange={async (val) => await updateProfile("people", val)}
          name="people"
          value={profile && profile.people ? profile.people : "none"}
        />
      </YStack>

      <YStack pt="$6">
        <SelectIt
          label={"Wielkość miasta/miejscowości"}
          items={[
            {
              label: "Nie podano",
              value: "none",
            },
            {
              label: "Wieś",
              value: "village",
            },
            {
              label: "Miasto do 20 tys. mieszkańców",
              value: "city20",
            },
            {
              label: "Miasto do 100 tys. mieszkańców",
              value: "city100",
            },
            {
              label: "Miasto powyżej 100 tys. mieszkańców",
              value: "city1000",
            },
          ]}
          onValueChange={async (val) => await updateProfile("city", val)}
          name="city"
          value={profile && profile.city ? profile.city : "none"}
        />
      </YStack>

      <XStack py="$6" alignSelf="center">
        <Button
          onPress={() => {
            Auth.signOut();
          }}
        >
          Wyloguj
        </Button>
      </XStack>
    </ScrollView>
  );
};

export default Profile;
