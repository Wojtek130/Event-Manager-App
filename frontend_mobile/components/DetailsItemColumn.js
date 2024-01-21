import { View, StyleSheet, Text } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const DetailsItemColumn = (props) => {
  return (
    <View
      style={[
        globalStyles.containerVertical,
        globalStyles.containerCentered,
        globalStyles.labelValuecontainer,
        styles.container,
      ]}
    >
      <Text style={[globalStyles.input, globalStyles.textLabel, styles.text]}>
        {props.objectKey}
      </Text>
      <Text
        style={[
          globalStyles.input,
          globalStyles.textValue,
          styles.textValue,
          styles.text,
        ]}
      >
        {props.value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "40%",
  },
  textValue: {
    height: "70%",
  },
  text: { width: "73%" },
});

export default DetailsItemColumn;
