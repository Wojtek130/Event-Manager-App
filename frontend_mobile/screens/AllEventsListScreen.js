import { View } from "react-native";
import { useState, useEffect } from "react";

import FilterBox from "../components/FilterBox";
import axiosInstance from "../utils/axiosInstance";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import ListItem from "../components/ListItem";
import MyFlatList from "../components/MyFlatList.js";
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
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setErrorMessage("");
      setSearchFilters(initialFilters);
    });
  }, [navigation]);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
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
    });
  }, [navigation]);
  const handleEventPress = (item) => {
    navigation.navigate("Event Details", item);
  };

  return (
    <View style={globalStyles.screen}>
      <SuccessMessage successMessage={successMessage} />
      <FilterBox
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        setEventsDisplayed={setEventsDisplayed}
        eventNameSubstringValue={searchFilters.eventNameSubstring}
        amOrganizerValue={searchFilters.amOrganizer}
        amParticipantValue={searchFilters.amParticipant}
        events={events}
      />
      <MyFlatList
        data={eventsDisplayed}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() => handleEventPress(item)}
            isChatHeader={false}
          />
        )}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </View>
  );
};

export default AllEventsScreen;
