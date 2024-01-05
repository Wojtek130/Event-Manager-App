import { TextInput, View, Text, StyleSheet } from "react-native";

import { TIME_FORMAT, DATE_FORMAT } from "../utils/constants";
import { globalStyles } from "../utils/stylesConstants";

const DateTimeInput = (props) => {
  const format = props.type === "date" ? DATE_FORMAT : TIME_FORMAT;
  // const placeholder =
  //   props.type === "date"
  //     ? `(${format}), eg. 01.02.2023`
  //     : `(${format}), eg. 07:55`;
  const placeholder = format;
  const maxLength = props.type === "date" ? 10 : 5;

  return (
    <View style={styles.containerHorizontal}>
      <Text style={globalStyles.input}>{props.labelText} </Text>
      <TextInput
        placeholder={placeholder}
        keyboardType="numeric"
        maxLength={maxLength}
        value={props.value}
        onChangeText={props.callback}
        style={[globalStyles.input]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: "row",
  },
});

export default DateTimeInput;
