import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

const SignInScreen = function ({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Username and Password cannot be empty");
      return;
    }
    dispatch(setUser({ username }));
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Log in" onPress={handleLogin} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default SignInScreen;
