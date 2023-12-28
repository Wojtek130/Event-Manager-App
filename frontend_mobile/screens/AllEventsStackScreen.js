// Import necessary components from react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import AllEventsListScreen from "./AllEventsListScreen";
import EventDetailsScreen from "./EventDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import EditEventScreen from "./EditEventScreen";

const AllEventsStack = createStackNavigator();

const AllEventsStackScreen = () => (
  <AllEventsStack.Navigator>
    <AllEventsStack.Screen
      name="All Events List"
      component={AllEventsListScreen}
      // headerMode="none"
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
