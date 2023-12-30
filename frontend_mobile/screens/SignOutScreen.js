import { useSelector, useDispatch } from "react-redux";
import { selectLastFetchTimestamp } from "../store/newMessagesSlice";
import axiosInstance from "../utils/axiosInstance";

import { clearUser } from "../store/authSlice";

import { Text, View, Button } from "react-native";

const SignOutScreen = function ({ navigation }) {
  const dispatch = useDispatch();
  const lft = useSelector(selectLastFetchTimestamp);

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(20,20,100)",
      }}
    >
      <Text>Sign Out</Text>
      <Button title="Log out" onPress={() => handleLogout()} />
    </View>
  );
};

export default SignOutScreen;
