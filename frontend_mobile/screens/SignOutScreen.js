import { Text, View } from "react-native";

const SignOutScreen = function ({ navigation }) {
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
    </View>
  );
};

export default SignOutScreen;
