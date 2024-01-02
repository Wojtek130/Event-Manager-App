import { TextInput, View } from "react-native";

import MySwitch from "./MySwitch";
import MyButton from "./MyButton";

const FilterBox = (props) => {
  return (
    <View>
      <TextInput
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

export default FilterBox;
