import { View } from "react-native";
import { useEffect } from "react";

import EventForm from "../components/EventForm";
import { globalStyles } from "../utils/stylesConstants";

const CreateEventScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.screen}>
      <EventForm creating={true} navigation={navigation} />
    </View>
  );
};

export default CreateEventScreen;
