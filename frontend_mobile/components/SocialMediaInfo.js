import { Text } from "react-native";

import {
  SOCIAL_MEDIA_PLATFORMS,
  SOCIAL_MEDIA_PLATFORMS_NAMES,
} from "../utils/constants";
import SocialMediaRow from "./SocialMediaRow";
import { globalStyles } from "../utils/stylesConstants";

const SocialMediaInfo = (props) => {
  console.log("sci", props.userData);
  console.log("sci", props.otherSocialMedia);

  return (
    <>
      <Text style={globalStyles.input}>Hello {props.user}!</Text>
      {props.userData &&
        Object.keys(props.userData.social_media).map((key) => {
          if (
            SOCIAL_MEDIA_PLATFORMS.includes(key) &&
            props.userData.social_media[key]
          ) {
            return (
              <SocialMediaRow
                key={key}
                valueLabel={
                  SOCIAL_MEDIA_PLATFORMS_NAMES[key]
                    ? SOCIAL_MEDIA_PLATFORMS_NAMES[key]
                    : key
                }
                value={props.userData.social_media[key]}
              />
            );
          }
        })}
      {props.otherSocialMedia[0] !== "" && (
        <SocialMediaRow
          valueLabel={props.otherSocialMedia[0]}
          value={props.otherSocialMedia[1]}
        />
      )}
    </>
  );
};

export default SocialMediaInfo;
