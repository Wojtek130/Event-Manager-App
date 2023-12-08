import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/authSlice';

const SignInScreen = function ({ navigation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // value is not updated
  const getUsername = useSelector((state) => state.auth.username);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // This will log the updated value of isLoggedIn whenever it changes
    console.log('isLoggedIn from the store:', isLoggedIn);
  }, [isLoggedIn]); // Run the effect whenever isLoggedIn changes

  const handleLogin = () => {
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Username and Password cannot be empty");
      return;
    }
    console.log("Username:", username);
    console.log("Password:", password);
    dispatch(setUser({ username }));
    setErrorMessage(`is LoggedIn: ${isLoggedIn} as ${getUsername}`);
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
      <Button title="Login" onPress={handleLogin} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default SignInScreen;
