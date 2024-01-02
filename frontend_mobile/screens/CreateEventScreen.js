import { View } from "react-native";

import EventForm from "../components/EventForm";
import { globalStyles } from "../utils/stylesConstants";

const CreateEventScreen = () => {
  return (
    <View style={globalStyles.screen}>
      <EventForm creating={true} />
    </View>
  );
};

export default CreateEventScreen;
