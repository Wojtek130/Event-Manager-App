import { Pressable, Text, StyleSheet } from "react-native";
import { orangePrimary } from "../utils/stylesConstants";

const MyButton = (props) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: orangePrimary,
    textTransform: "uppercase",
    width: "30%",
  },
  text: {
    color: "white",
    fontSize: 10,
  },
});
export default MyButton;
