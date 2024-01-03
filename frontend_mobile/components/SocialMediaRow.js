import { StyleSheet, View, Text } from "react-native";

import { globalStyles, width50Per } from "../utils/stylesConstants";

const SocialMediaRow = (props) => {
  return (
    <View
      style={[
        globalStyles.containerHorizontal,
        globalStyles.containerCentered,
        styles.container,
      ]}
      key={props.key}
    >
      <Text style={globalStyles.input}>{props.valueLabel}</Text>
      <Text style={globalStyles.input}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "strech",
    justifyContent: "space-between",
    width : width50Per,
  },
});

export default SocialMediaRow;
