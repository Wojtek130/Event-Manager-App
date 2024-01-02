import React, { useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { setUser } from "../store/authSlice";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import { globalStyles } from "../utils/stylesConstants";

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
    <View style={globalStyles.screen}>
      <MyTextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <MyTextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <MyButton title="Log in" onPress={handleLogin} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default SignInScreen;
