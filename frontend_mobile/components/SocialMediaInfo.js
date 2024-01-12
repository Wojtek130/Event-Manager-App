import { Text } from "react-native";

import {
  SOCIAL_MEDIA_PLATFORMS,
  SOCIAL_MEDIA_PLATFORMS_NAMES,
} from "../utils/constants";
import SocialMediaRow from "./SocialMediaRow";
import { globalStyles } from "../utils/stylesConstants";

const SocialMediaInfo = (props) => {
  return (
    <>
      <Text style={globalStyles.input}>User: {props.user}</Text>
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
