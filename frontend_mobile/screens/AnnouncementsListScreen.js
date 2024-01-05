import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ErrorMessage from "../components/ErrorMessage";
import axiosInstance from "../utils/axiosInstance";
import ListItem from "../components/ListItem";
import MyFlatList from "../components/MyFlatList";
import FilterBox from "../components/FilterBox";
import { selectNewMessages, selectOldMessages } from "../store/messagesSlice";
import { globalStyles } from "../utils/stylesConstants";

const AnnouncementsListScreen = ({ navigation }) => {
  const initialFilters = {
    eventNameSubstring: "",
    amOrganizer: false,
    amParticipant: false,
  };

  const [events, setEvents] = useState([]);
  const [eventsDisplayed, setEventsDisplayed] = useState([]);
  const [searchFilters, setSearchFilters] = useState(initialFilters);
  const [errorMessage, setErrorMessage] = useState("");

  const newMessages = useSelector(selectNewMessages);
  const oldMessages = useSelector(selectOldMessages);

  useEffect(() => {
    console.log(oldMessages, "important component");
    console.log(newMessages, "important component");
  }, [newMessages, oldMessages]);

  const unreadMessagesAvailable = (item, a) => !!a[item.id];
  console.log(oldMessages);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/events");
          setEvents(response.data.events);
          setEventsDisplayed(response.data.events);
          console.log(response.data.events);
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
      fetchData();
    });
  }, [navigation]);
  const handleEventPress = (item) => {
    navigation.navigate("Announcements Chat", { item: item });
  };
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.input}>Announcements Screen:</Text>
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
        renderItem={({ item }) => {
          if (item.am_organizer || item.am_participant) {
            return (
              <ListItem
                item={item}
                unreadMessagesAvailable={unreadMessagesAvailable(
                  item,
                  newMessages
                )}
                onPress={() => handleEventPress(item)}
                isChatHeader={true}
              />
            );
          }
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </View>
  );
};

export default AnnouncementsListScreen;
