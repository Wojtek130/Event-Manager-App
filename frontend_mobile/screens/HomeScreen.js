import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";

import { selectUser } from "../store/authSlice";
import { globalStyles } from "../utils/stylesConstants";

const HomeScreen = function ({ navigation }) {
  const user = useSelector(selectUser);

  return (
    <View style={[globalStyles.screen, styles.mainContainer]}>
      <Text style={globalStyles.input}> Welcome to Event Manager</Text>
      {user ? (
        <Text style={globalStyles.input}> Logged in as : {user}</Text>
      ) : (
        <Text style={globalStyles.input}> Logged out</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // borderColor: "pink",
    // backgroundColor: "yellow",
    // alignItems: "center"
  },
});
export default HomeScreen;
