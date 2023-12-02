import { Text, View } from "react-native";

const RegisterScreen = function ({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(20,200,100)",
        }}
      >
        <Text>Register</Text>
      </View>
    );
  };

export default RegisterScreen;
