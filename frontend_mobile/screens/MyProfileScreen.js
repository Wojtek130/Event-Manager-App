import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MyProfileScreen = function ({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(10,200,50)",
        }}
      >
        <Text>MyProfile</Text>
      </View>
    );
  };

export default MyProfileScreen;
