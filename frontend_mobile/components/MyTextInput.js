import { TextInput, StyleSheet } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const MyTextInput = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      label={props.label}
      defaultValue={props.defaultValue}
      value={props.value}
      onChangeText={props.onChangeText}
      mode="outlined"
      style={[globalStyles.input]}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "yellow",
  },
});
export default MyTextInput;
