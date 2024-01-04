import { Text, StyleSheet } from "react-native";

import { globalStyles, successColor } from "../utils/stylesConstants";

const SuccessMessage = (props) => {
  return props.successMessage ? <Text style={[globalStyles.input, styles.container]}>{props.successMessage} </Text> : <></>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: successColor,
    textAlign: "center",
  },
});
export default SuccessMessage;
