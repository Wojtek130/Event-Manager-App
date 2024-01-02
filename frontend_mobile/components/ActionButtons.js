import { View, StyleSheet } from "react-native";

import MyButton from "./MyButton";

const ActionButtons = (props) => {
  return (
    <View>
    {props.amOrganizer ? (
      <>
        <MyButton title="edit" onPress={props.handleEdit} />
        <MyButton title="delete" onPress={props.handleDelete} />
      </>
    ) : 
    props.amParticipant ? (
      <MyButton title="leave" onPress={props.handleLeave} />
    ) : (
      <MyButton title="join" onPress={props.handleJoin} />
    )}
  </View>
  );
};

export default ActionButtons;
