import { View, Text, StyleSheet } from "react-native";

const Message = (props) => {
  return <Text>{props.item.body}</Text>;
};

export default Message;
