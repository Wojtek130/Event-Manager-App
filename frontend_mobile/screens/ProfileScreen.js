import { Text } from "react-native";
import { useState, useEffect } from "react";

import SocialMediaInfo from "../components/SocialMediaInfo";
import ErrorMessage from "../components/ErrorMessage";
import { SOCIAL_MEDIA_PLATFORMS } from "../utils/constants";
import axiosInstance from "../utils/axiosInstance";

const ProfileScreen = ({ route }) => {
  const user = route.params.user;
  const initialOSM = ["", ""];
  const [userData, setUserData] = useState(null);
  const [otherSocialMedia, setOtherSocialMedia] = useState(initialOSM);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("right component :D");

  const fetchUserData = async () => {
    console.log("fetching data");
    try {
      const response = await axiosInstance.get(`profile/${user}/`);
      setUserData(await response.data);
      const osm = Object.entries(response.data.social_media).filter(
        ([key]) => !SOCIAL_MEDIA_PLATFORMS.includes(key)
      );
      const osmArray = osm[0] ? osm[0] : initialOSM;
      setOtherSocialMedia(osmArray);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <SocialMediaInfo
        user={user}
        userData={userData}
        otherSocialMedia={otherSocialMedia}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default ProfileScreen;
