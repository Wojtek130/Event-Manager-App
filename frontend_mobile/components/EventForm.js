import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

import { selectUser } from "../store/authSlice";
import axiosInstance from "../utils/axiosInstance";
import LongTextInput from "./LongTextInput";
import DateTimeInput from "./DateTimeInput";
import MySwitch from "./MySwitch";
import MyMultiSelect from "./MyMultiSelect";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import MyTextInput from "./MyTextInput";
import { printSuccessMessage } from "../utils/functions";

import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_REGEX,
  TIME_REGEX,
} from "../utils/constants";
import MyButton from "./MyButton";

const EventForm = (props) => {
  useEffect(() => {
    const focusListener = props.navigation.addListener("focus", () => {
      setErrorMessage("");
      setSuccessMessage("");
    });
  }, [props.navigation]);
  const user = useSelector(selectUser);
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
    participants: [],
  };
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState(
    props.creating ? initialFormData : props.eventData
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!formData.name) {
      setErrorMessage("Event name cannot be empty");
      return;
    }
    if (props.creating && events.find((e) => e.name === formData.name)) {
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
    if (
      formData.organizers.some((element) =>
        formData.participants.includes(element)
      )
    ) {
      setErrorMessage(
        `A user cannot be event's organizer and participant at the same time`
      );
      return;
    }
    try {
      let response;
      if (!props.creating) {
        response = await axiosInstance.patch(
          "event/",
          {
            name: formData.name,
            start_date: `${formData.startDate} ${formData.startTime}`,
            end_date: `${formData.endDate} ${formData.endTime}`,
            description: formData.description,
            faq: formData.faq,
            private: formData.private,
            organizers: formData.organizers,
            participants: formData.participants,
            id: props.eventId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axiosInstance.post(
          "event/",
          {
            name: formData.name,
            start_date: `${formData.startDate} ${formData.startTime}`,
            end_date: `${formData.endDate} ${formData.endTime}`,
            description: formData.description,
            faq: formData.faq,
            private: formData.private,
            organizers: formData.organizers,
            participants: formData.participants,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      printSuccessMessage(
        response,
        setSuccessMessage,
        props.creating
          ? "Event Successfully created"
          : "Event Successfully modified"
      );
    } catch (error) {
      setErrorMessage(
        error.request.responseText ? error.request.responseText : error.message
      );
      return;
    }
    if (props.creating) {
      setFormData(initialFormData);
    }
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
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("users/");
        setUsers(response.data.users.filter((u) => u.username !== user));
      } catch (error) {
        setErrorMessage(error);
      }
    };

    fetchUsers();
    fetchEvents();
  }, []);

  return (
    <ScrollView>
      <MyTextInput
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
        text={"Pick Organizers"}
      />
      {!props.creating && (
        <MyMultiSelect
          items={users.filter((u) => {
            return !formData.organizers.includes(u.username);
          })}
          value={formData.participants}
          callback={(value) => handleChange("participants", value)}
          text={"Pick Participants"}
        />
      )}
      <MyButton title="submit" onPress={handleSubmit} />
      <ErrorMessage errorMessage={errorMessage} />
      <SuccessMessage successMessage={successMessage} />
    </ScrollView>
  );
};

export default EventForm;
