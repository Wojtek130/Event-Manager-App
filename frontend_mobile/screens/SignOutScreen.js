import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";

import { Text, View, Button } from "react-native";

const SignOutScreen = function ({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
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
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default SignOutScreen;
