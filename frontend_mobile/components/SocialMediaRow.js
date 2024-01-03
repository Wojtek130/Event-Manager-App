import { StyleSheet, View, Text } from "react-native";

import { globalStyles, width50Per } from "../utils/stylesConstants";

const SocialMediaRow = (props) => {
  return (
    <View
      style={[
        globalStyles.containerHorizontal,
        globalStyles.containerCentered,
        globalStyles.labelValuecontainer,
      ]}
      key={props.key}
    >
      <Text style={[globalStyles.input, globalStyles.textLabel]}>
        {props.valueLabel}
      </Text>
      <Text style={[globalStyles.input, globalStyles.textValue]}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({


});

export default SocialMediaRow;
