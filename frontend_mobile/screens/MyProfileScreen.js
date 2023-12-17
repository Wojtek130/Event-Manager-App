import { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

const Tab = createBottomTabNavigator();

const MyProfileScreen = function ({ navigation }) {
  const [notes, setNotes] = useState("");
  console.log("hello from profile");
  const fetchData = async () => {
    const response = await axiosInstance.get("http://127.0.0.1:8000/protected/");
    // const response = await axios.get("http://127.0.0.1:8000/");
    console.log(response.data, "aaasdsk");
    if (response.status === 200) {
      setNotes(JSON.stringify(response.data));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(10,200,50)",
      }}
    >
      <Text>MyProfile</Text>
      <Button title="Fetch data" onPress={fetchData} />
      <Text>{notes}</Text>
    </View>
  );
};

export default MyProfileScreen;
