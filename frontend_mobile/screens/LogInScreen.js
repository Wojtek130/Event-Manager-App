import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { setUser } from "../store/authSlice";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import { globalStyles } from "../utils/stylesConstants";
import ErrorMessage from "../components/ErrorMessage";


const LogInScreen = function ({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setUsername("");
      setPassword("");
      setErrorMessage("");
    });
  }, [navigation]);

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
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <MyButton title="Log in" onPress={handleLogin} />
      <ErrorMessage errorMessage={errorMessage} />
    </View>
  );
};

export default LogInScreen;
