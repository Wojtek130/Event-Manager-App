import { Text, View, Button } from "react-native";
import { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import ActionButtons from "../components/ActionButtons";
import DetailsRow from "../components/DetailsRow";
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
      if (response.status >= 200 && response.status < 300) {
        navigation.replace("All Events List", {
          successMessage: "successfully deleted event",
        });
      }
    } catch (error) {
      setErrorMessage(
        error.request.responseText ? error.request.responseText : error.message
      );
    }
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
      <ActionButtons
        amOrganizer={route.params.am_organizer}
        amParticipant={route.params.am_participant}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleJoin={handleJoin}
        handleLeave={handleLeave}
      />
      {Object.entries(eventDetails).map(([key, value], index) => {
        console.log("from loop", key, value);
        return (
          // <View key={index}>
          //   <Text>{key}:</Text>
          //   <Text>{value}</Text>
          // </View>
          <DetailsRow objectKey={key} value={value} key={index} />
        );
      })}
      <Text>outside loop</Text>
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default EventDetailsScreen;
