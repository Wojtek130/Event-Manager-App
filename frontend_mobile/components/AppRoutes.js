import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import { selectUser } from "../store/authSlice";
import {
  fetchNewMessages,
  fetchOldMessages,
  fetchLastFetch,
  selectLastFetchTimestamp,
} from "../store/messagesSlice";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
// import AllEventsScreen from "../screens/AllEventsScreen";
import AllEventsStackScreen from "../screens/AllEventsStackScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import AnnouncementsScreen from "../screens/AnnouncementsScreen";
import SignInScreen from "../screens/SignInScreen";
import SignOutScreen from "../screens/SignOutScreen";

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  const user = useSelector(selectUser);
  const lft = useDispatch(selectLastFetchTimestamp);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstAnnouncementsFetch = () => {
      try {
        dispatch(fetchLastFetch())
          .then(() => {
            dispatch(fetchOldMessages());
            dispatch(fetchNewMessages());
          })
          .catch((error) => {
            console.log("first dispatch error", error);
          });
        console.log("last fetch timestamp before fetching", lft);
      } catch (error) {
        console.log(error, "dispatch error");
      }
    };
    firstAnnouncementsFetch();
    return async () => {
      try {
        const response = await axiosInstance.post("last_fetch/", {
          last_fetch: lft,
        });
        console.log("turn down fetch down");
      } catch (error) {
        console.log(error, "setting lf error");
      }
    };
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        {user ? (
          <>
            {/* <Drawer.Screen name="My Events" component={MyEventsScreen} /> */}
            <Drawer.Screen name="All Events" component={AllEventsStackScreen} />
            <Drawer.Screen name="My Profile" component={MyProfileScreen} />
            <Drawer.Screen name="Create Event" component={CreateEventScreen} />
            <Drawer.Screen
              name="Announcements"
              component={AnnouncementsScreen}
            />
            <Drawer.Screen name="Sign Out" component={SignOutScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Sign In" component={SignInScreen} />
            <Drawer.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
