import { View, StyleSheet, Text } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const DetailsItem = (props) => {
  return (
    <View
      style={[globalStyles.labelValuecontainer, props.row ? styles.horizontalContainer : styles.verticalContainer]}
    >
      <Text style={[globalStyles.input, globalStyles.textLabel]}>{props.objectKey}</Text>
      <Text style={[globalStyles.input, globalStyles.textValue]}>{props.value}</Text>
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
});

export default DetailsItem;
