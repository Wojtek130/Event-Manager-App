import { useSelector } from "react-redux";
import { Text, View } from "react-native";

import { selectUser } from "../store/authSlice";
import { globalStyles } from "../utils/stylesConstants";

const HomeScreen = function ({ navigation }) {
  const user = useSelector(selectUser);

  return (
    <View style={globalStyles.screen}>
      <Text> Home</Text>
      {user ? <Text> Logged in as : {user}</Text> : <Text> Logged out</Text>}
    </View>
  );
};

export default HomeScreen;
