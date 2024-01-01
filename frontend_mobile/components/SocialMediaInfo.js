import { Text } from "react-native";
import {
  SOCIAL_MEDIA_PLATFORMS,
  SOCIAL_MEDIA_PLATFORMS_NAMES,
} from "../utils/constants";

const SocialMediaInfo = (props) => {
  console.log("sci", props.userData);
  console.log("sci", props.otherSocialMedia);

  return (
    <>
      <Text>Hello {props.user}!</Text>
      {props.userData &&
        Object.keys(props.userData.social_media).map((key) => {
          if (
            SOCIAL_MEDIA_PLATFORMS.includes(key) &&
            props.userData.social_media[key]
          ) {
            return (
              <Text key={key}>
                {SOCIAL_MEDIA_PLATFORMS_NAMES[key]
                  ? SOCIAL_MEDIA_PLATFORMS_NAMES[key]
                  : key}
                {""}: {props.userData.social_media[key]}
              </Text>
            );
          }
        })}
      {props.otherSocialMedia[0] !== "" && (
        <Text>
          {props.otherSocialMedia[0]}: {props.otherSocialMedia[1]}
        </Text>
      )}
    </>
  );
};

export default SocialMediaInfo;
