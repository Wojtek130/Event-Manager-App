// AllEventsScreen.js

import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

const eventsData = [
  { id: '1', title: 'Event 1', details: 'Details for Event 1' },
  { id: '2', title: 'Event 2', details: 'Details for Event 2' },
  // Add more events as needed
];

const AllEventsScreen = ({ navigation }) => {
  const handleEventPress = (eventId) => {
    // Navigate to the event details screen with the selected event ID
    navigation.navigate('Event Details', { "id" : eventId });
  };

  return (
    <View>
      <FlatList
        data={eventsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress(item.id)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AllEventsScreen;
