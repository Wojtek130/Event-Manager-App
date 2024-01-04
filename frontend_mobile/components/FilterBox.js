import { StyleSheet, View } from "react-native";

import MySwitch from "./MySwitch";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";
import { globalStyles, margin, borderRadius, padding} from "../utils/stylesConstants";

const FilterBox = (props) => {
  return (
    <View
      style={[
        globalStyles.containerHorizontal,
        globalStyles.containerCentered,
        globalStyles.border,
        styles.container,
      ]}
    >
      <MyTextInput
        placeholder="Event Name"
        label="Name"
        defaultValue={props.eventNameSubstringValue}
        onChangeText={(text) =>
          props.handleFiltersChangeCallback("eventNameSubstring", text)
        }
        mode="outlined"
      />
      <MySwitch
        labelText="Organizer"
        value={props.amOrganizerValue}
        callback={(value) => {
          props.handleFiltersChangeCallback("amOrganizer", value);
        }}
      />
      <MySwitch
        labelText="Participant"
        value={props.amParticipantValue}
        callback={(value) => {
          props.handleFiltersChangeCallback("amParticipant", value);
        }}
      />
      <MyButton title="search" onPress={props.handleApplyFiltersCallback} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    margin: margin,
  },
});

export default FilterBox;
