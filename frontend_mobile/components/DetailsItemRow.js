import { View, StyleSheet, Text } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const DetailsItemRow = (props) => {
  return (
    <View
      style={[
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

const styles = StyleSheet.create({});

export default DetailsItemRow;
