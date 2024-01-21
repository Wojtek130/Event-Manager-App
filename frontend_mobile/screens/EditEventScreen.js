import { View } from "react-native";

import EventForm from "../components/EventForm";
import { globalStyles } from "../utils/stylesConstants";

const EditEventScreen = ({ route, navigation }) => {
  console.log("event details: ", route.params.eventData, route.params.eventId);
  return (
    <View style={globalStyles.screen}>
      <EventForm
        creating={false}
        eventData={route.params.eventData}
        eventId={route.params.eventId}
        navigation={navigation}
      />
    </View>
  );
};

export default EditEventScreen;
