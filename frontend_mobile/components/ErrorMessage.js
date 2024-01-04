import { Text, StyleSheet } from "react-native";

import { globalStyles, errorColor } from "../utils/stylesConstants";

const ErrorMessage = (props) => {
  return props.errorMessage ? (
    <Text style={[globalStyles.input, styles.container]}>
      {props.errorMessage}{" "}
    </Text>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: errorColor,
    textAlign: "center",
  },
});
export default ErrorMessage;
