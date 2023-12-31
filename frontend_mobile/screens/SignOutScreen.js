import { useSelector, useDispatch } from "react-redux";
import { selectLastFetchTimestamp } from "../store/messagesSlice";
import { selectAuthTokens } from "../store/authSlice";

import axiosInstance from "../utils/axiosInstance";

import { clearUser } from "../store/authSlice";

import { Text, View, Button } from "react-native";
import { useEffect } from "react";

const SignOutScreen = function ({ navigation }) {
  const dispatch = useDispatch();
  const lft = useSelector(selectLastFetchTimestamp);
  const at = useSelector(selectAuthTokens);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  useEffect(() => {
    handleLogout();
    // navigation.replace("Home");
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("last_fetch/", {
        last_fetch: lft,
      });
    } catch (error) {
      console.log(at, "///////////////");
      console.log(error, "setting lf error");
    }
    dispatch(clearUser());
    console.log("loggging out");
  };
  return <Text>Sign Out</Text>;
};

export default SignOutScreen;
