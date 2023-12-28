import { Text, View, Button } from "react-native";
import { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import ErrorMessage from "../components/ErrorMessage";

const EventDetailsScreen = function ({ route, navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [eventDetails, setEventDetails] = useState([]);

  const eventId = route.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/event", {
          params: {
            id: eventId,
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

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `event/delete/${eventId}/`,
        {
          id: eventId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        navigation.replace("All Events List", {
          successMessage: "successfully deleted event",
        });
      }
    } catch (error) {
      setErrorMessage(
        error.request.statusText ? error.request.statusText : error.message
      );
    }
  };
  const handleJoin = async () => {
    try {
      const response = await axiosInstance.post(
        "event/join/",
        {
          id: eventId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setErrorMessage(
        error.request.responseText ? error.request.responseText : error.message
      );
    }
    console.log("successfully joined");
    navigation.replace("All Events List", {
      successMessage: "successfully joined event",
    });
  };
  const handleEdit = () => {};
  const handleLeave = async () => {
    console.log("helloooo!");
    try {
      const response = await axiosInstance.post(
        "event/leave/",
        {
          id: eventId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setErrorMessage(
        error.request.responseText ? error.request.responseText : error.message
      );
    }
    console.log("successfully left");
    navigation.replace("All Events List", {
      successMessage: "successfully left event",
    });
  };

  return (
    <>
      <Text>Event {eventId} Details</Text>
      <View>
        {route.params.am_organizer ? (
          <>
            <Button title="edit" onPress={handleEdit} />
            <Button title="delete" onPress={handleDelete} />
          </>
        ) : // <Text>Not organizer</Text>
        route.params.am_participant ? (
          <Button title="leave" onPress={handleLeave} />
        ) : (
          <Button title="join" onPress={handleJoin} />
        )}
      </View>
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default EventDetailsScreen;
