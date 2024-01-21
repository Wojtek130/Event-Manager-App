import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  FlatListComponent,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axiosInstance from "../utils/axiosInstance";
import { selectUser } from "../store/authSlice";
import ActionButtons from "../components/ActionButtons";
import ErrorMessage from "../components/ErrorMessage";
import { transformEventData } from "../utils/functions";
import { globalStyles, bluePrimaryLight } from "../utils/stylesConstants";
import DetailsItemRow from "../components/DetailsItemRow";
import DetailsItemColumn from "../components/DetailsItemColumn";
import DetailsPeople from "../components/DetailsPeople";

const EventDetailsScreen = function ({ route, navigation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [eventDetails, setEventDetails] = useState([]);
  const user = useSelector(selectUser);
  const eventId = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/event/", {
          params: {
            id: eventId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setEventDetails(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`event/delete/${eventId}/`);
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
          successMessage: "successfully joined event",
        });
      }
    } catch (error) {
      setErrorMessage(
        error.request.responseText ? error.request.responseText : error.message
      );
    }
  };
  const handleEdit = () => {
    navigation.replace("Edit Event", {
      eventData: transformEventData(eventDetails),
      eventId: eventId,
    });
  };
  const handleLeave = async () => {
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
    navigation.replace("All Events List", {
      successMessage: "successfully left event",
    });
  };

  const handleUserClick = (item) => {
    const destination = user == item ? "My Profile" : "Profile";
    navigation.navigate(destination, {
      user: item,
    });
  };
  const detailsHorizontalBox = new Array();
  const detailsVerticalBox = new Array();
  const detailsFlatlistBox = new Array();
  Object.entries(eventDetails).forEach(([key, value], index) => {
    const currentItem = [key, value, index];
    if (key == "private") {
    } else if (key === "participants" || key === "organizers") {
      detailsFlatlistBox.push(currentItem);
    } else if (key == "faq" || key == "description") {
      detailsVerticalBox.push(currentItem);
    } else {
      detailsHorizontalBox.push(currentItem);
    }
  });
  let organizers = detailsFlatlistBox[0];
  let participants = detailsFlatlistBox[1];
  if (organizers) {
    organizers = organizers[1];
  }
  if (participants) {
    participants = participants[1];
  }
  return (
    // <ScrollView contentContainerStyle={globalStyles.screen}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={globalStyles.input}>Event {eventId} Details</Text>
      {/* <View style={[globalStyles.labelValuecontainer]}> */}
      {/* <View style={[]}> */}
      {detailsHorizontalBox.map((item) => {
        const [key, value, index] = item;
        return <DetailsItemRow objectKey={key} value={value} key={index} />;
      })}
      {detailsVerticalBox.map((item) => {
        const [key, value, index] = item;
        return <DetailsItemColumn objectKey={key} value={value} key={index} />;
      })}
      <DetailsPeople
        people={participants}
        peopleRole={"Participants"}
        onPressCallback={(item) => handleUserClick(item)}
      />
      <DetailsPeople
        people={organizers}
        peopleRole={"Organizers"}
        onPressCallback={(item) => handleUserClick(item)}
      />

      {/* {participants && (
        <View
          style={[
            globalStyles.containerHorizontal,
            globalStyles.containerCentered,
            globalStyles.labelValuecontainer,
          ]}
        >
          <Text style={[globalStyles.input, globalStyles.textLabel]}>
            {"Participants"}
          </Text>
          <FlatList
            data={participants}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleUserClick(item)}
                key={item}
                style={[globalStyles.input]}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )} */}
      {/* </View> */}
      {/* {Object.entries(eventDetails).map(([key, value], index) => {
        const rowCondition = !(key == "faq" || key == "description");
        if (key == "private") {
          return;
          // return <key={index}></key=>;
        }
        if (key === "participants" || key === "organizers") {
          return (
            <View key={index}>
              <Text>{key}: </Text>
              <FlatList
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
      })} */}
      <ActionButtons
        amOrganizer={route.params.am_organizer}
        amParticipant={route.params.am_participant}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleJoin={handleJoin}
        handleLeave={handleLeave}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: bluePrimaryLight,
    paddingVertical: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventDetailsScreen;
