import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "react-native";
import { useEffect } from "react";

import { selectLastFetchTimestamp } from "../store/messagesSlice";
import axiosInstance from "../utils/axiosInstance";
import { clearUser } from "../store/authSlice";
import { globalStyles } from "../utils/stylesConstants";

const LogOutScreen = function ({ navigation }) {
  const dispatch = useDispatch();
  const lft = useSelector(selectLastFetchTimestamp);
  useEffect(() => {
    handleLogout();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("last_fetch/", {
        last_fetch: lft,
      });
    } catch (error) {
      console.error(error);
    }
    dispatch(clearUser());
  };
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.input}>Log Out</Text>
    </View>
  );
};

export default LogOutScreen;
