import { Switch, View, Text, StyleSheet } from "react-native";

const MySwitch = (props) => {
  return (
    <View style={styles.containerHorizontal}>
      <Text>{props.labelText} </Text>
      <Switch onValueChange={props.callback} value={props.value} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: "row",
  },
});

export default MySwitch;
