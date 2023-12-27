import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

import MySwitch from "../components/MySwitch";
import FilterBox from "../components/FilterBox";
import axiosInstance from "../utils/axiosInstance";
import ErrorMessage from "../components/ErrorMessage";

const AllEventsScreen = ({ navigation }) => {
  const initialFilters = {
    eventNameSubstring: "",
    amOrganizer: false,
    amParticipant: false,
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsDisplayed, setEventsDisplayed] = useState([]);
  const [searchFilters, setSearchFilters] = useState(initialFilters);

  const handleFiltersChange = (field, value) => {
    setSearchFilters({
      ...searchFilters,
      [field]: value,
    });
    console.log(value, "new");
  };

  const handleApplyFilters = () => {
    const newEvents = new Array();
    console.log(searchFilters, "filters");
    Object.entries(events).forEach(([key, value]) => {
      const amOrganizerCondition = searchFilters.amOrganizer
        ? value.am_organizer
        : true;
      const amParticipantCondition = searchFilters.amParticipant
        ? value.am_participant
        : true;
      if (
        value.name.includes(searchFilters.eventNameSubstring) &&
        amOrganizerCondition &&
        amParticipantCondition
      ) {
        newEvents.push(value);
      }
    });
    console.log(newEvents, "new events");
    setEventsDisplayed(newEvents);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/events");
        console.log(response.data.events, "aaa");
        setEvents(response.data.events);
        setEventsDisplayed(response.data.events);
        console.log(response.data.events, "initial!");
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);
  const handleEventPress = (eventId) => {
    navigation.navigate("Event Details", { id: eventId });
  };

  return (
    <>
      {/* <View>
        <TextInput
          placeholder="Event Name"
          label="Name"
          defaultValue={searchFilters.eventNameSubstring}
          onChangeText={(text) =>
            handleFiltersChange("eventNameSubstring", text)
          }
          mode="outlined"
        />
        <MySwitch
          labelText="Organizer"
          value={searchFilters.amOrganizer}
          callback={(value) => {
            handleFiltersChange("amOrganizer", value);
          }}
        />
        <MySwitch
          labelText="Participant"
          value={searchFilters.amParticipant}
          callback={(value) => {
            handleFiltersChange("amParticipant", value);
          }}
        />
        <Button title="search" onPress={handleApplyFilters} />
      </View> */}
      <FilterBox
        setSearchFiltersCallback={setSearchFilters}
        eventNameSubstringValue={searchFilters.eventNameSubstring}
        amOrganizerValue={searchFilters.amOrganizer}
        amParticipantValue={searchFilters.amParticipant}
        handleFiltersChangeCallback={handleFiltersChange}
        handleApplyFiltersCallback={handleApplyFilters}
      />
      <FlatList
        data={eventsDisplayed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

export default AllEventsScreen;
