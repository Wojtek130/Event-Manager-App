import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { Provider } from "react-redux";

import store from "./store/store";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyEventsScreen from "./screens/MyEventsScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import SignOutScreen from "./screens/SignOutScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          {loggedIn ? (
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
    </Provider>
  );
}
