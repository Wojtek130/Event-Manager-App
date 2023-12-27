import { Text, StyleSheet } from "react-native";

import { errorColor } from "../utils/constants";

const ErrorMessage = (props) => {
  return props.errorMessage ? (
    <Text style={styles.container}>{props.errorMessage} </Text>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: errorColor,
  },
});
export default ErrorMessage;
