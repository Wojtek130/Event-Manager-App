import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyEventsOrganizerScreen from "./MyEventsOrganizerScreen";
import MyEventsParticipantScreen from "./MyEventsParticipantScreen";

const Tab = createBottomTabNavigator();

const MyEventsScreen = function ({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(10,150,50)",
        }}
      >
        <Tab.Navigator>
          <Tab.Screen name="MyEventsOrganizer" component={MyEventsOrganizerScreen} />
          <Tab.Screen name="MyEventsParticipant" component={MyEventsParticipantScreen} />
        </Tab.Navigator>
      </View>
    );
  };

export default MyEventsScreen;
