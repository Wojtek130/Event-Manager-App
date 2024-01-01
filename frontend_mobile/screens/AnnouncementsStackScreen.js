// Import necessary components from react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import AnnouncementsChatScreen from "./AnnouncementsChatScreen";
import AnnouncementsListScreen from "./AnnouncementsListScreen";

const AnnouncementsStack = createStackNavigator();

const AnnouncementsStackScreen = () => (
  <AnnouncementsStack.Navigator>
    <AnnouncementsStack.Screen
      name="Announcements Headers"
      component={AnnouncementsListScreen}
      // headerMode="none"
      options={{ headerShown: false }}
    />
    <AnnouncementsStack.Screen
      name="Announcements Chat"
      component={AnnouncementsChatScreen}
    />
  </AnnouncementsStack.Navigator>
);

export default AnnouncementsStackScreen;
