import { View, StyleSheet } from "react-native";

import MyButton from "./MyButton";
import { globalStyles } from "../utils/stylesConstants";

const ActionButtons = (props) => {
  return (
    <View style={[globalStyles.containerHorizontal]}>
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
