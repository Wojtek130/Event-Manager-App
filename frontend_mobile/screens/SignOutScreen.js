import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "react-native";
import { useEffect } from "react";

import { selectLastFetchTimestamp } from "../store/messagesSlice";
import axiosInstance from "../utils/axiosInstance";
import { clearUser } from "../store/authSlice";
import { globalStyles } from "../utils/stylesConstants";

const SignOutScreen = function ({ navigation }) {
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
      console.log(error, "setting lf error");
    }
    dispatch(clearUser());
    console.log("loggging out");
  };
  return (
    <View style={globalStyles.screen}>
      <Text>Sign Out</Text>
    </View>
  );
};

export default SignOutScreen;
