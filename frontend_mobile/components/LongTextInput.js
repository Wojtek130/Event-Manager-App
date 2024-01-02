import { TextInput } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const LongTextInput = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.callback}
      multiline
      numberOfLines={4}
      mode="outlined"
      style={globalStyles.input}
    />
  );
};

export default LongTextInput;
