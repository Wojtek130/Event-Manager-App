import { Switch, View, Text, StyleSheet } from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const MySwitch = (props) => {
  return (
    <View style={globalStyles.containerHorizontal}>
      <Text>{props.labelText} </Text>
      <Switch onValueChange={props.callback} value={props.value} />
    </View>
  );
};


export default MySwitch;
