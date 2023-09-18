import React, { useState, useEffect } from "react";
import { Text, TextArea, ScrollView, Button } from "tamagui";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../models";
import Slider from "./Slider";

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
  userID: string;
}

const Profile: React.FC<ProfileProps> = ({ userID }) => {
  const [profile, setProfile] = useState<ProfileData>({});

  const saveProfile = async () => {
    try {
      const original = await DataStore.query(User, userID);
      console.log("original", original);
      console.log("profile", userID);

      if (original) {
        await DataStore.save(
          User.copyOf(original, (updated) => {
            updated.profile = JSON.stringify(profile);
          })
        );
      } else {
        await DataStore.save(
          new User({
            id: userID,
            profile: JSON.stringify(profile),
          })
        );
      }

      alert("Profile information saved!");
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  const updateProfile = async (name: string, value: string | number) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };

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
          userID
        );
        if (userData && userData.profile) {
          const profile: ProfileData = JSON.parse(userData.profile);
          setProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userID]);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Age:</Text>
      <Slider
        defaultValue={[profile.age || 18]}
        onValueChange={setAge}
        min={18}
        max={100}
        step={1}
      />

      <Text>Gender:</Text>
      <TextArea
        value={profile.gender}
        onChangeText={setGender}
        placeholder="Enter gender"
      />

      <Text>Level of Education:</Text>
      <TextArea
        value={profile.education}
        onChangeText={setEducation}
        placeholder="Enter level of education"
      />

      <Text>Monthly Income:</Text>
      <TextArea
        value={profile.income}
        onChangeText={setIncome}
        placeholder="Enter monthly income"
        keyboardType="numeric"
      />

      <Text>Number of People in Household:</Text>
      <TextArea
        value={profile.householdCount}
        onChangeText={setHouseholdCount}
        placeholder="Enter number of people in household"
        keyboardType="numeric"
      />

      <Text>Number of People in City:</Text>
      <TextArea
        value={profile.cityPopulation}
        onChangeText={setCityPopulation}
        placeholder="Enter city population"
        keyboardType="numeric"
      />

      <Button onPress={saveProfile}>Zapisz</Button>
    </ScrollView>
  );
};

export default Profile;
