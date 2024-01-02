import React, { useState, useEffect } from "react";
import { View, FlatList} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Message from "../components/Message";
import ErrorMessage from "../components/ErrorMessage";
import MessageInput from "../components/MessageInput";
import {
  selectNewMessages,
  selectOldMessages,
  setRead,
} from "../store/messagesSlice";
import { mergeArrays } from "../utils/functions";
import { globalStyles } from "../utils/stylesConstants";

const AnnouncementsChatScreen = ({ route }) => {
  const dispatch = useDispatch();
  const item = route.params.item;
  const [errorMessage, setErrorMessage] = useState("");
  const newMessages = useSelector(selectNewMessages)[item.id];
  const oldMessages = useSelector(selectOldMessages)[item.id];
  let allMessages = mergeArrays(oldMessages, newMessages);
  console.log(oldMessages, newMessages, "new mes");
  useEffect(() => {
    if (newMessages) {
      dispatch(setRead({ eventId: item.id, messages: newMessages }));
    }
  }, [newMessages, oldMessages]);

  return (
    <View style={globalStyles.screen}>
      <FlatList
        data={allMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Message item={item} />;
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
      {item.am_organizer && <MessageInput item={item} />}
    </View>
  );
};

export default AnnouncementsChatScreen;
