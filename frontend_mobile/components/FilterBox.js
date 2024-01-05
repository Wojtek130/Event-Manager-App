import { StyleSheet, View } from "react-native";

import MySwitch from "./MySwitch";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";
import { globalStyles, margin, borderRadius, padding} from "../utils/stylesConstants";

const FilterBox = (props) => {
  const handleFiltersChange = (field, value) => {
    props.setSearchFilters({
      ...props.searchFilters,
      [field]: value,
    });
    console.log(value, "new");
  };

  const handleApplyFilters = () => {
    const newEvents = new Array();
    console.log(props.searchFilters, "filters");
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
    console.log(newEvents, "new events");
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
          // props.handleFiltersChangeCallback("eventNameSubstring", text)
          handleFiltersChange("eventNameSubstring", text)

        }
        mode="outlined"
      />
      <MySwitch
        labelText="Organizer"
        value={props.amOrganizerValue}
        callback={(value) => {
          // props.handleFiltersChangeCallback("amOrganizer", value);
          handleFiltersChange("amOrganizer", value);

        }}
      />
      <MySwitch
        labelText="Participant"
        value={props.amParticipantValue}
        callback={(value) => {
          // props.handleFiltersChangeCallback("amParticipant", value);
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
