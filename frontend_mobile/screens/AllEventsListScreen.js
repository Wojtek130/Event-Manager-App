import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { useState, useEffect } from "react";

import FilterBox from "../components/FilterBox";
import axiosInstance from "../utils/axiosInstance";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { globalStyles } from "../utils/stylesConstants";

const AllEventsScreen = ({ navigation, route }) => {
  const initialFilters = {
    eventNameSubstring: "",
    amOrganizer: false,
    amParticipant: false,
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsDisplayed, setEventsDisplayed] = useState([]);
  const [searchFilters, setSearchFilters] = useState(initialFilters);
  const successMessage = route.params?.successMessage;

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
        setEvents(response.data.events);
        setEventsDisplayed(response.data.events);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);
  const handleEventPress = (item) => {
    navigation.navigate("Event Details", item);
  };

  return (
    <View style={globalStyles.screen}>
      <SuccessMessage successMessage={successMessage} />
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
          <TouchableOpacity onPress={() => handleEventPress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={[globalStyles.mainChildren]}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </View>
  );
};

export default AllEventsScreen;
