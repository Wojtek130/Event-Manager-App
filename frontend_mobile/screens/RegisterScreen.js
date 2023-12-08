import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const RegisterScreen = function ({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Username and Password cannot be empty");
      return;
    }
    if (password !== confirmedPassword) {
      setErrorMessage("Password and confirmed password don't match");
      return;
    }
    console.log("Username:", username);
    console.log("Password:", password);
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
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmedPassword}
        onChangeText={(text) => setConfirmedPassword(text)}
      />
      <Button title="Register" onPress={handleLogin} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default RegisterScreen;
