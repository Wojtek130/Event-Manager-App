import { Pressable, Text, StyleSheet } from "react-native";
import { orangePrimary } from "../utils/stylesConstants";

import { borderRadius, margin, padding } from "../utils/stylesConstants";

const MyButton = (props) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: margin,
    padding: padding,
    borderRadius: borderRadius,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: orangePrimary,
    textTransform: "uppercase",
    // width: "30%",
  },
  text: {
    color: "white",
    fontSize: 10,
  },
});
export default MyButton;
