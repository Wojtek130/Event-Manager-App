import { View, Button, StyleSheet } from "react-native";

const ActionButtons = (props) => {
  return (
    <View>
    {props.amOrganizer ? (
      <>
        <Button title="edit" onPress={props.handleEdit} />
        <Button title="delete" onPress={props.handleDelete} />
      </>
    ) : 
    props.amParticipant ? (
      <Button title="leave" onPress={props.handleLeave} />
    ) : (
      <Button title="join" onPress={props.handleJoin} />
    )}
  </View>
  );
};

export default ActionButtons;
