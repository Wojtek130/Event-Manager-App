import { Text, FlatList, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import ActionButtons from "../components/ActionButtons";
import DetailsItem from "../components/DetailsItem";
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

  const handleUserClick = (item) => {
    console.log(item);
    navigation.navigate("My Profile", {
      user: item,
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
        const rowCondition = !(key == "faq" || key == "description");
        if (key == "private") {
          return;
          // return <key={index}></key=>;
        }
        if (key == "participants" || key == "organizers") {
          return (
            <View>
              <Text>{key}: </Text>
              <FlatList
                key={index}
                data={value}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleUserClick(item)}
                    key={item}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );
        }
        return (
          <DetailsItem
            objectKey={key}
            value={value}
            key={index}
            row={rowCondition}
          />
        );
      })}
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default EventDetailsScreen;
