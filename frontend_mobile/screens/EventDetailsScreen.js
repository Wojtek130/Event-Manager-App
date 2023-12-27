import { Text, View } from "react-native";
import { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import ErrorMessage from "../components/ErrorMessage";

const EventDetailsScreen = function ({ route }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [eventDetails, setEventDetails] = useState([]);
  const eventID = route.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/event", {
          params: {
            id: eventID,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data, "aaa");
        setEventDetails(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
      <Text> Event {eventID} Details</Text>
      <ErrorMessage errorMessage={errorMessage} />
    </View>
  );
};

export default EventDetailsScreen;
