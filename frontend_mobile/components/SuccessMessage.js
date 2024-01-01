import { Text, StyleSheet } from "react-native";

import { successColor } from "../utils/constants";

const SuccessMessage = (props) => {
  return props.successMessage ? <Text style={styles.container}>{props.successMessage} </Text> : <></>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: successColor,
  },
});
export default SuccessMessage;
