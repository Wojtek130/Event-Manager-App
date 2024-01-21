import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import { selectUser, selectAuthTokens } from "../store/authSlice";
import {
  fetchNewMessages,
  fetchOldMessages,
  fetchLastFetch,
  selectLastFetchTimestamp,
  selectNewMessages,
} from "../store/messagesSlice";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AllEventsStackScreen from "../screens/AllEventsStackScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import AnnouncementsStackScreen from "../screens/AnnouncementsStackScreen";
import LogInScreen from "../screens/LogInScreen";
import LogOutScreen from "../screens/LogOutScreen";
import { FETCH_INTERVAL, DEFAULT_DRAWER_LABEL } from "../utils/constants";
import { isEmptyObject } from "../utils/functions";
import { bluePrimary, globalStyles } from "../utils/stylesConstants";

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  const user = useSelector(selectUser);
  const at = useSelector(selectAuthTokens);
  const newMessages = useSelector(selectNewMessages);
  const lft = useDispatch(selectLastFetchTimestamp);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstAnnouncementsFetch = async () => {
      try {
        dispatch(fetchLastFetch())
          .then(() => {
            dispatch(fetchOldMessages());
            dispatch(fetchNewMessages());
          })
          .catch((error) => {
            console.error("first dispatch error", error);
          });
      } catch (error) {
        console.error(error, "dispatch error");
      }
    };
    let intervalId = 0;
    if (user) {
      firstAnnouncementsFetch();
      intervalId = setInterval(() => {
        dispatch(fetchNewMessages());
      }, FETCH_INTERVAL);
    }
    return async () => {
      if (user) {
        clearInterval(intervalId);
      }
    };
  }, [user]);

  useEffect(() => {
    return async () => {
      try {
        const response = await axiosInstance.post("last_fetch/", {
          last_fetch: lft,
        });
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={globalStyles.commonDrawersOptions}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        {user ? (
          <>
            <Drawer.Screen name="Events" component={AllEventsStackScreen} />
            <Drawer.Screen name="My Profile" component={MyProfileScreen} />
            <Drawer.Screen name="Create Event" component={CreateEventScreen} />
            <Drawer.Screen
              name="Announcements"
              component={AnnouncementsStackScreen}
              options={{
                drawerLabelStyle: {
                  fontWeight: isEmptyObject(newMessages)
                    ? DEFAULT_DRAWER_LABEL
                    : "bold",
                    color: "white",
                },
              }}
            />
            <Drawer.Screen name="Log Out" component={LogOutScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Log In" component={LogInScreen} />
            <Drawer.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
