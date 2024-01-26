import { StyleSheet, View } from "react-native";

import MySwitch from "./MySwitch";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";
import { globalStyles, margin} from "../utils/stylesConstants";

const FilterBox = (props) => {
  const handleFiltersChange = (field, value) => {
    props.setSearchFilters({
      ...props.searchFilters,
      [field]: value,
    });
  };

  const handleApplyFilters = () => {
    const newEvents = new Array();
    Object.entries(props.events).forEach(([key, value]) => {
      const amOrganizerCondition = props.searchFilters.amOrganizer
        ? value.am_organizer
        : true;
      const amParticipantCondition = props.searchFilters.amParticipant
        ? value.am_participant
        : true;
      if (
        value.name.includes(props.searchFilters.eventNameSubstring) &&
        amOrganizerCondition &&
        amParticipantCondition
      ) {
        newEvents.push(value);
      }
    });
    props.setEventsDisplayed(newEvents);
  };
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
          handleFiltersChange("eventNameSubstring", text)
        }
        mode="outlined"
      />
      <MySwitch
        labelText="Organizer"
        value={props.amOrganizerValue}
        callback={(value) => {
          handleFiltersChange("amOrganizer", value);
        }}
      />
      <MySwitch
        labelText="Participant"
        value={props.amParticipantValue}
        callback={(value) => {
          handleFiltersChange("amParticipant", value);
        }}
      />
      <MyButton title="search" onPress={handleApplyFilters} />
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
