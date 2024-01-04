import { View, StyleSheet, Text } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const DetailsItem = (props) => {
  return (
    <View
      style={[
        // props.row ? styles.horizontalContainer : styles.verticalContainer,
        globalStyles.containerHorizontal,
        globalStyles.containerCentered,
        globalStyles.labelValuecontainer,
      ]}
    >
      <Text style={[globalStyles.input, globalStyles.textLabel]}>
        {props.objectKey}
      </Text>
      <Text style={[globalStyles.input, globalStyles.textValue]}>
        {props.value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
  },
  verticalContainer: {
    flexDirection: "column",
  },
  container: {
    width: "75%",
  },
});

export default DetailsItem;
