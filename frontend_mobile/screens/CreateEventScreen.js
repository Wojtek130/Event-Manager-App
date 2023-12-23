import React, { useState } from "react";
import { ScrollView, View, Text, Button, TextInput } from "react-native";
import MultiSelect from "react-native-multiple-select";
import LongTextInput from "../components/LongTextInput";
import DateTimeInput from "../components/DateTimeInput";
import MySwitch from "../components/MySwitch";

const CreateEventScreen = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    startDate: "",
    startTime: "",
    endDate: "",
    description: "",
    faq: "",
    private: false,
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    console.log(value);
  };

  const handleSubmit = () => {
    // Handle form submission, you can send the data to your server or perform other actions
    console.log(formData);
  };

  const items = [
    {
      id: "92iijs7yta",
      name: "Ondo",
    },
    {
      id: "a0s0a8ssbsd",
      name: "Ogun",
    },
    {
      id: "16hbajsabsd",
      name: "Calabar",
    },
    {
      id: "nahs75a5sg",
      name: "Lagos",
    },
    {
      id: "667atsas",
      name: "Maiduguri",
    },
    {
      id: "hsyasajs",
      name: "Anambra",
    },
    {
      id: "djsjudksjd",
      name: "Benue",
    },
    {
      id: "sdhyaysdj",
      name: "Kaduna",
    },
    {
      id: "suudydjsjd",
      name: "Abuja",
    },
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  return (
    <ScrollView>
      <TextInput
        placeholder="Event Name"
        label="Name"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
        mode="outlined"
      />
      <DateTimeInput
        type="time"
        labelText="Start Time: "
        value={formData.startTime}
        callback={(text) => handleChange("startTime", text)}
      />
      <DateTimeInput
        type="date"
        labelText="Start Date: "
        value={formData.startDate}
        callback={(text) => handleChange("startDate", text)}
      />
      <DateTimeInput
        type="time"
        labelText="End Time: "
        value={formData.endTime}
        callback={(text) => handleChange("endTime", text)}
      />
      <DateTimeInput
        type="date"
        labelText="End Date: "
        value={formData.endDate}
        callback={(text) => handleChange("endDate", text)}
      />

      <LongTextInput
        placeholder="Description"
        value={formData.description}
        callback={(text) => handleChange("description", text)}
      />
      <LongTextInput
        placeholder="FAQ"
        value={formData.faq}
        callback={(text) => handleChange("faq", text)}
      />
      <MySwitch
        labelText="Private Event"
        value={formData.private}
        callback={(value) => {
          handleChange("private", value);
        }}
      />
      <MultiSelect
        // hideTags
        items={items}
        uniqueKey="id"
        // ref={(component) => {
        //   this.multiSelect = component;
        // }}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Users"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Choose"
      />
      <Button title="submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CreateEventScreen;
