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
import { Auth } from "aws-amplify";

type ProfileData = {
  age: number;
  gender: string;
  education: string;
  income: number;
  householdCount: number;
  cityPopulation: number;
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

  const saveProfile = async () => {
    try {
      if (hasProfile) {
        const original = await DataStore.query(User, profileId);
        await DataStore.save(
          User.copyOf(original, (updated) => {
            updated.profile = JSON.stringify(profile);
          })
        );
      } else {
        const result = await DataStore.save(
          new User({
            profile: JSON.stringify(profile),
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
    // await saveProfile();
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

  const setAge = (value: string) => updateProfile("age", value);
  const setGender = (value: string) => updateProfile("gender", value);
  const setEducation = (value: string) => updateProfile("education", value);
  const setIncome = (value: string) => updateProfile("income", value);
  const setHouseholdCount = (value: string) =>
    updateProfile("householdCount", value);
  const setCityPopulation = (value: string) =>
    updateProfile("cityPopulation", value);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData: UserData | undefined = await DataStore.query(
          User,
          profileId
        );
        if (userData && userData.profile) {
          setProfile(userData.profile);
          setHasProfile(true);
          console.log("profile", profile, userData.profile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [profileId]);

  function getProfit() {
    if (!profile) return 0;
    if (profile.income === 1000) return "< 1000";
    if (profile.income === 20000) return "> 20000";
    return profile.income;
  }

  function getPopulation() {
    if (!profile) return "-";
    return {
      "1": "<100 tyś",
      "2": "100-500 tyś",
      "3": ">500 tyś",
    }[profile.cityPopulation];
  }

  return (
    <ScrollView p="$6" contentContainerStyle={{ flexGrow: 1 }}>
      <XStack>
        <Label width={60} htmlFor="name">
          Wiek: {profile && profile.age}
        </Label>
      </XStack>
      <Slider
        value={profile && profile.age}
        onValueChange={setAge}
        min={18}
        max={100}
        step={1}
      />

      <XStack pt="$8">
        <Label width={60} htmlFor="name">
          Płeć:
        </Label>
      </XStack>
      <Radio
        value={profile && profile.gender}
        onValueChange={setGender}
        name="gender"
        id="rg-22"
        items={[
          { value: "all", label: "każda" },
          { value: "female", label: "kobieta" },
          { value: "male", label: "mężczyzna" },
        ]}
      />

      <XStack pt="$8">
        <Label width={200} htmlFor="name">
          Wykształecenie
        </Label>
      </XStack>
      <Radio
        value={profile && profile.education}
        onValueChange={setEducation}
        name="education"
        id="rg-23"
        items={[
          { value: "1", label: "podstawowe" },
          { value: "2", label: "średnie" },
          { value: "3", label: "wyższe" },
        ]}
      />

      <XStack pt="$8" pb="$4">
        <Label width={300} htmlFor="name">
          Przybliżony mie. przychód: {getProfit()}
        </Label>
      </XStack>
      <Slider
        value={profile && profile.income}
        onValueChange={setIncome}
        min={1000}
        max={20000}
        step={1000}
      />

      <XStack pt="$8" pb="$4">
        <Label width={300} htmlFor="name">
          Liczba osob w gosp. domowym: {profile && profile.householdCount}
        </Label>
      </XStack>
      <Slider
        value={profile && profile.householdCount}
        onValueChange={setHouseholdCount}
        min={1}
        max={10}
        step={1}
      />

      <XStack pt="$8">
        <Label width={400} htmlFor="name">
          Liczba osób w mieście: {getPopulation()}
        </Label>
      </XStack>
      <Radio
        value={profile && profile.cityPopulation}
        onValueChange={setCityPopulation}
        name="cityPopulation"
        id="rg-23"
        items={[
          { value: "1", label: "<100 tyś" },
          { value: "2", label: "100-500 tyś" },
          { value: "3", label: ">500 tyś" },
        ]}
      />
      <XStack py="$6" alignSelf="center">
        <Button onPress={saveProfile} theme="active" size="$4" mr="$4">
          Zapisz
        </Button>
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
