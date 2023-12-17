import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";

const RegisterScreen = function ({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearInputFields = () => {
    setUsername("");
    setPassword("");
    setConfirmedPassword("");
  };
  const handleRegister = async () => {
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
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "!!!!!!!!!");
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        console.log(data, "resp");
        setErrorMessage("Successful registration");
      } else {
        setErrorMessage("Log in failed");
      }
    } catch (error) {
      setErrorMessage("Log in failed");
    }
    clearInputFields();
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
      <Button title="Register" onPress={handleRegister} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default RegisterScreen;
