import { Text, View } from "react-native";

const SignInScreen = function ({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(20,20,200)",
      }}
    >
      <Text>Sign In</Text>
    </View>
  );
};

export default SignInScreen;
