import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const ChatHeader = (props) => {
  const handleEventPress = () => {
    props.navigation.navigate("Announcements Chat", { item: props.item });
  };
  return (
    <View>
      <TouchableOpacity onPress={handleEventPress}>
        <Text
          style={
            props.unreadMessagesAvailable
              ? styles.markedText
              : styles.normalText
          }
        >
          {props.item.name}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  normalText: {},
  markedText: {
    fontWeight: "bold",
  },
});
export default ChatHeader;
