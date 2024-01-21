import { createStackNavigator } from "@react-navigation/stack";

import AllEventsListScreen from "./AllEventsListScreen";
import EventDetailsScreen from "./EventDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import EditEventScreen from "./EditEventScreen";
import { globalStyles } from "../utils/stylesConstants";

const AllEventsStack = createStackNavigator();

const AllEventsStackScreen = () => (
  <AllEventsStack.Navigator screenOptions={globalStyles.commonDrawersOptions}>
    <AllEventsStack.Screen
      name="All Events List"
      component={AllEventsListScreen}
      options={{ headerShown: false }}
    />
    <AllEventsStack.Screen
      name="Event Details"
      component={EventDetailsScreen}
    />
    <AllEventsStack.Screen name="Profile" component={ProfileScreen} />
    <AllEventsStack.Screen name="Edit Event" component={EditEventScreen} />
  </AllEventsStack.Navigator>
);

export default AllEventsStackScreen;
