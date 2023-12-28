import { useState, useEffect } from "react";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";
import { useSelector } from "react-redux";

import { selectUser } from "../store/authSlice";
import axiosInstance from "../utils/axiosInstance";
import {
  SOCIAL_MEDIA_PLATFORMS,
  SOCIAL_MEDIA_PLATFORMS_NAMES,
} from "../utils/constants";
import SocialMediaInfo from "../components/SocialMediaInfo";

const MyProfileScreen = function ({ navigation }) {
  const user = useSelector(selectUser);
  const initialOSM = ["", ""];
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [otherSocialMedia, setOtherSocialMedia] = useState(initialOSM);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserData = async () => {
    console.log("fetching data called");
    try {
      const response = await axiosInstance.get("my_profile/");
      setUserData(await response.data);
      console.log(response.data.social_media);
      const osm = Object.entries(response.data.social_media).filter(
        ([key]) => !SOCIAL_MEDIA_PLATFORMS.includes(key)
      );
      const osmArray = osm[0] ? osm[0] : initialOSM;
      setOtherSocialMedia(osmArray);
    } catch (error) {
      setErrorMessage(error.errorMessage);
    }
  };
  const handleEdit = () => setEditMode(true);
  const handleSave = async () => {
    if (otherSocialMedia[0] && !otherSocialMedia[1]) {
      setErrorMessage(
        "Other Social Media User cannot be empty when Other Social Media is given"
      );
      return;
    }
    if (!otherSocialMedia[0] && otherSocialMedia[1]) {
      setErrorMessage(
        "Other Social Media cannot be empty when Other Social Media User is given"
      );
      return;
    }
    const newSocialMedia = {};
    Object.entries(userData.social_media).forEach(([k, v]) => {
      if (SOCIAL_MEDIA_PLATFORMS.includes(k)) {
        newSocialMedia[k] = v;
      }
    });
    if (otherSocialMedia[0] && otherSocialMedia[1]) {
      newSocialMedia[otherSocialMedia[0]] = otherSocialMedia[1];
    }
    console.log(newSocialMedia, "new social media");
    try {
      const response = await axiosInstance.patch(
        "my_profile/",
        {
          social_media: newSocialMedia,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setErrorMessage(error);
      return;
    }
    setUserData((prevData) => ({ ...prevData, social_media: newSocialMedia }));
    setEditMode(false);
    setErrorMessage("");
  };
  const handleChange = (field, value) => {
    setUserData((prevData) => {
      const newData = prevData;
      newData.social_media[field] = value;
      return newData;
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      {!editMode ? (
        <>
          <SocialMediaInfo
            user={user}
            userData={userData}
            otherSocialMedia={otherSocialMedia}
          />
          {userData && <Button title="edit profile" onPress={handleEdit} />}
        </>
      ) : (
        <>
          {SOCIAL_MEDIA_PLATFORMS.map((item, index) => (
            <View key={item} style={styles.horizontalInputsContainer}>
              <Text>{SOCIAL_MEDIA_PLATFORMS_NAMES[item]}: </Text>
              <TextInput
                // placeholder={SOCIAL_MEDIA_PLATFORMS_NAMES[item]}
                defaultValue={userData.social_media[item]}
                onChangeText={(text) => handleChange(item, text)}
              />
            </View>
          ))}
          <View style={styles.horizontalInputsContainer}>
            <TextInput
              placeholder={
                !otherSocialMedia[0]
                  ? "Other Social Media"
                  : otherSocialMedia[0]
              }
              value={otherSocialMedia[0]}
              onChangeText={(text) =>
                setOtherSocialMedia((prevState) => {
                  return [text, prevState[1]];
                })
              }
            />
            <TextInput
              placeholder={
                !otherSocialMedia[1]
                  ? "Other Social Media Username"
                  : otherSocialMedia[1]
              }
              value={otherSocialMedia[1]}
              onChangeText={(text) =>
                setOtherSocialMedia((prevState) => {
                  return [prevState[0], text];
                })
              }
            />
          </View>
          <Button title="save changes" onPress={handleSave} />
          <Text>{errorMessage}</Text>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  horizontalInputsContainer: {
    flexDirection: "row",
  },
});
export default MyProfileScreen;
