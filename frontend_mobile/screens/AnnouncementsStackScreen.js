import { createStackNavigator } from "@react-navigation/stack";

import AnnouncementsChatScreen from "./AnnouncementsChatScreen";
import AnnouncementsListScreen from "./AnnouncementsListScreen";
import { globalStyles } from "../utils/stylesConstants";

const AnnouncementsStack = createStackNavigator();

const AnnouncementsStackScreen = () => (
  <AnnouncementsStack.Navigator screenOptions={globalStyles.commonDrawersOptions}>
    <AnnouncementsStack.Screen
      name="Announcements Headers"
      component={AnnouncementsListScreen}
      options={{ headerShown: false }}
    />
    <AnnouncementsStack.Screen
      name="Announcements Chat"
      component={AnnouncementsChatScreen}
    />
  </AnnouncementsStack.Navigator>
);

export default AnnouncementsStackScreen;
