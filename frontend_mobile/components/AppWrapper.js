import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { selectUser } from "../store/authSlice";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import SignOutScreen from "../screens/SignOutScreen";

const Drawer = createDrawerNavigator();

export default function AppWrapper() {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        {user ? (
          <>
            <Drawer.Screen name="My Events" component={MyEventsScreen} />
            <Drawer.Screen name="My Profile" component={MyProfileScreen} />
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
