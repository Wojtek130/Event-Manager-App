import { Text, View } from "react-native";

const EventDetailsScreen = function ({ route }) {
  console.log(route.params, "???????");
  const eventID = route.params.id;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Event {eventID} Details</Text>
    </View>
  );
};

export default EventDetailsScreen;
