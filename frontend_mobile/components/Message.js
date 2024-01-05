import { Text, StyleSheet } from "react-native";

import {
  bluePrimary,
  borderRadius,
} from "../utils/stylesConstants";

const Message = (props) => {
  return <Text style={[styles.text]}>{props.item.body}</Text>;
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "white",
    color: bluePrimary,
    paddingVertical: 2,
    paddingHorizontal: 7,
    margin: 2,
    borderRadius: borderRadius,
  },
});
export default Message;
