import { View, StyleSheet, Text } from "react-native";

const DetailsItem = (props) => {
  return (
    <View
      style={props.row ? styles.horizontalContainer : styles.verticalContainer}
    >
      <Text>{props.objectKey}: </Text>
      <Text>{props.value}</Text>
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
