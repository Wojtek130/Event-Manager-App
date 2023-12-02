import { Text, View } from "react-native";

const MyEventsParticipantScreen = function ({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(100,70,30)",
        }}
      >
        <Text>MyEventsParticipant</Text>
      </View>
    );
  };

export default MyEventsParticipantScreen;
