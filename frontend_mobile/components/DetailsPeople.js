import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { globalStyles } from "../utils/stylesConstants";

const DetailsPeople = (props) => {
  if (!props.people || props.people.length === 0) {
    return <></>;
  }
  return (
    <View
      style={[
        globalStyles.containerVertical,
        globalStyles.containerCentered,
        globalStyles.labelValuecontainer,
        globalStyles.border,
        styles.container,
      ]}
    >
      <Text style={[globalStyles.input, globalStyles.textLabel, styles.label]}>
        {props.peopleRole}
      </Text>
      {/* <View style={[styles.flatListContainer]}> */}
      <FlatList
        data={props.people}
        keyExtractor={(item) => item}
        contentContainerStyle={[globalStyles.containerCentered]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => props.onPressCallback(item)}
            key={item}
            style={[globalStyles.input]}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {},

  flatList: {},
  text: { color: "white" },
  label: {
    alignSelf: "center",
  },
  container: { width: "36%" },
});

export default DetailsPeople;
