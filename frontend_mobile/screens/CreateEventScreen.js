import React, { useState, useEffect } from "react";
import { ScrollView, Button, TextInput } from "react-native";
import { useSelector } from "react-redux";

import { selectUser } from "../store/authSlice";
import axiosInstance from "../utils/axiosInstance";
import LongTextInput from "../components/LongTextInput";
import DateTimeInput from "../components/DateTimeInput";
import MySwitch from "../components/MySwitch";
import MyMultiSelect from "../components/MyMultiSelect";
import ErrorMessage from "../components/ErrorMessage";
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_REGEX,
  TIME_REGEX,
} from "../utils/constants";

const CreateEventScreen = () => {
  const user = useSelector(selectUser);
  console.log("current user", user);
  const initialFormData = {
    name: "",
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    description: "",
    faq: "",
    private: false,
    organizers: [],
  };
  const initialFormData2 = {
    name: "mock01",
    startTime: "01:05",
    startDate: "12.12.2007",
    endTime: "02:02",
    endDate: "12.12.2009",
    description: "a",
    faq: "k",
    private: false,
    organizers: [],
  };
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState(initialFormData2);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(events);
    setErrorMessage("");
    if (!formData.name) {
      setErrorMessage("Event name cannot be empty");
      return;
    }
    if (events.find((e) => e.name === formData.name)) {
      setErrorMessage("An event with this name already exists");
      return;
    }
    if (
      !DATE_REGEX.test(formData.startDate) ||
      !DATE_REGEX.test(formData.startDate)
    ) {
      setErrorMessage(`Dates must be in format: ${DATE_FORMAT}`);
      return;
    }
    if (
      !TIME_REGEX.test(formData.startTime) ||
      !TIME_REGEX.test(formData.endTime)
    ) {
      console.log(formData.startTime, formData.endTime);
      setErrorMessage(`Times must be in format: ${TIME_FORMAT}`);
      return;
    }
    if (!typeof formData.private === "boolean") {
      setErrorMessage(`Private must be either true of false`);
      return;
    }
    formData.organizers.forEach((o) => {
      if (!formData.organizers.find((user) => user.id === o.id)) {
        setErrorMessage(`The id of the chosen user ${o.username} is unknown`);
        return;
      }
    });
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        "event/",
        {
          name: formData.name,
          start_date: `${formData.startDate} ${formData.startTime}`,
          end_date: `${formData.endDate} ${formData.endTime}`,
          description: formData.description,
          faq: formData.faq,
          private: formData.private,
          organizers: formData.organizers,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setErrorMessage("Event Successfully craeted");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.request.responseText ? error.request.responseText : error.message
      );
      return;
    }
    setFormData(initialFormData);
    try {
      fetchEvents();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get("events/");
      setEvents(response.data.events);
    } catch (error) {
      setErrorMessage(error);
    }
  };
  useEffect(() => {
    ///
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("users/");
        setUsers(response.data.users.filter((u) => u.username !== user));
      } catch (error) {
        setErrorMessage(error);
      }
      console.log(users, "11111");
    };

    fetchUsers();
    fetchEvents();
  }, []);

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
      <MyMultiSelect
        items={users}
        value={formData.organizers}
        callback={(value) => handleChange("organizers", value)}
      />
      <Button title="submit" onPress={handleSubmit} />
      <ErrorMessage errorMessage={errorMessage} />
    </ScrollView>
  );
};

export default CreateEventScreen;
