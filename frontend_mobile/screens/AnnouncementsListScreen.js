import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ErrorMessage from "../components/ErrorMessage";
import axiosInstance from "../utils/axiosInstance";
import ChatHeader from "../components/ChatHeader";
import { selectNewMessages, selectOldMessages } from "../store/messagesSlice";
import { globalStyles } from "../utils/stylesConstants";

const AnnouncementsListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/events");
        setEvents(response.data.events);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);
  const handleEventPress = (item) => {
    navigation.navigate("Announcements Chat", { item: item });
  };
  return (
    <View style={globalStyles.screen}>
      <Text>Announcements Screen:</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.am_organizer || item.am_participant) {
            return (
              <ChatHeader
                item={item}
                navigation={navigation}
                unreadMessagesAvailable={unreadMessagesAvailable(item, newMessages)}
                onPress={() => handleEventPress(item)}
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
