import { TextInput, View, Text, StyleSheet } from "react-native";

const DateTimeInput = (props) => {
  const placeholder =
    props.type === "date"
      ? "(dd.mm.yyyy), eg. 01.02.2023"
      : "(hh:mm), eg. 07:55";
  const maxLength = props.type === "date" ? 10 : 5;

  return (
    <View style={styles.containerHorizontal}>
      <Text>{props.labelText} </Text>
      <TextInput
        placeholder={placeholder}
        keyboardType="numeric"
        maxLength={maxLength}
        value={props.value}
        onChangeText={props.callback}
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
