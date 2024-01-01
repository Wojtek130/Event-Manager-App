import AllEventsStackScreen from "../screens/AllEventsStackScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import AnnouncementsListScreen from "../screens/AnnouncementsListScreen";
import SignOutScreen from "../screens/SignOutScreen";

const LoggedInScreens = (props) => {
  return (
    <>
      <props.drawer.Screen name="All Events" component={AllEventsStackScreen} />
      <props.drawer.Screen name="My Profile" component={MyProfileScreen} />
      <props.drawer.Screen name="Create Event" component={CreateEventScreen} />
      <props.drawer.Screen
        name="Announcements"
        component={AnnouncementsListScreen}
      />
      <props.drawer.Screen name="Sign Out" component={SignOutScreen} />
    </>
  );
};

export default LoggedInScreens;
