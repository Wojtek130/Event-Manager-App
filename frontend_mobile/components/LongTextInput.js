import { TextInput } from "react-native";

const LongTextInput = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.callback}
      multiline
      numberOfLines={4}
      mode="outlined"
    />
  );
};

export default LongTextInput;
