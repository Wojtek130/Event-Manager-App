import { useSelector } from "react-redux";
import { Text, View } from "react-native";

import { selectUser } from "../store/authSlice";

const HomeScreen = function ({ navigation }) {
  const user = useSelector(selectUser);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Home</Text>
      {user ? <Text> Logged in as : {user}</Text> : <Text> Logged out</Text>}
    </View>
  );
};

export default HomeScreen;
