import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const ListItem = (props) => {
  let chatHeaderStyle = null;
  if (props.isChatHeader) {
    chatHeaderStyle = props.unreadMessagesAvailable
      ? styles.markedText
      : styles.normalText;
  }
  return (
    <View style={globalStyles.input}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={[styles.text, chatHeaderStyle]}>{props.item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text : {color:"white"},
  normalText: {},
  markedText: {
    fontWeight: "bold",
  },
});
export default ListItem;
