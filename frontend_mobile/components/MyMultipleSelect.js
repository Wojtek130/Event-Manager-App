import { Switch, View, Text } from "react-native";

const MyMultiSelect = (props) => {
  return (
    <View>
      <Text>{props.labelText} </Text>
      <Switch onValueChange={props.callback} value={props.value} />
    </View>
  );
};

export default MyMultiSelect;
