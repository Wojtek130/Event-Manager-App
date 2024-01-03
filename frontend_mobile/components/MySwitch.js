import { Switch, View, Text, StyleSheet } from "react-native";

import {
  globalStyles,
  bluePrimaryLight,
  bluePrimary,
} from "../utils/stylesConstants";

const MySwitch = (props) => {
  return (
    <View
      style={[
        globalStyles.containerHorizontal,
        globalStyles.containerCentered,
        globalStyles.input,
        styles.container,
      ]}
    >
      <Text style={styles.label}>{props.labelText} </Text>
      <Switch
        onValueChange={props.callback}
        value={props.value}
        trackColor={{ false: bluePrimaryLight, true: "white" }}
        thumbColor="white"
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  switch: { margin: 5 },
  label: { color: "white" },
});
export default MySwitch;
