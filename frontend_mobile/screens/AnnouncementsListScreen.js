import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ErrorMessage from "../components/ErrorMessage";
import axiosInstance from "../utils/axiosInstance";
import ListItem from "../components/ListItem";
import MyFlatList from "../components/MyFlatList";
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get("/events");
  //       setEvents(response.data.events);
  //       console.log(response.data.events);
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/events");
          setEvents(response.data.events);
          console.log(response.data.events);
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
  
      fetchData();
      // Call your function here
      console.log('Screen is focused! Call your function here.');
    });

    // Clean up the listener when the component unmounts
    return () => {
      focusListener.remove();
    };
  }, [navigation]);
  const handleEventPress = (item) => {
    navigation.navigate("Announcements Chat", { item: item });
  };
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.input}>Announcements Screen:</Text>
      <MyFlatList
        data={events}
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
