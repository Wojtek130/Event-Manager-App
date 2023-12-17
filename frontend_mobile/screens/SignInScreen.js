import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";


import { setUser } from "../store/authSlice";

const SignInScreen = function ({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Username and Password cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/token/",
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
      if (response.status === 200) {
        const data = response.data;
        const decodedData = jwtDecode(data.access);
        dispatch(
          setUser({
            authTokens: JSON.stringify(data),
          })
        );
      } else {
        setErrorMessage("Log in failed");
      }
    } catch (error) {
      setErrorMessage("Log in failed");
    }
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
