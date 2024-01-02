import { View } from "react-native";
import { useState } from "react";

import axiosInstance from "../utils/axiosInstance";
import ErrorMessage from "./ErrorMessage";
import { printSuccessMessage } from "../utils/functions";
import SuccessMessage from "./SuccessMessage";
import MyButton from "./MyButton";
import MyTextInput from "./MyTextInput";

const MessageInput = (props) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputSubmit = async () => {
    console.log("Input submitted:", message);
    try {
      const response = await axiosInstance.post(
        "message/",
        {
          event: props.item.id,
          body: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      printSuccessMessage(
        response,
        setSuccessMessage,
        "Announcement successfully published"
      );
      setMessage("");
    } catch (error) {
      setErrorMessage(
        error.request?.responseText ? error.request.responseText : error.message
      );
    }
  };
  return (
    <>
      <View>
        <MyTextInput
          placeholder="Type message..."
          value={message}
          onChangeText={(inputText) => setMessage(inputText)}
          onSubmitEditing={handleInputSubmit}
          returnKeyType="done"
        />
        <MyButton title="Submit" onPress={handleInputSubmit} />
      </View>
      <ErrorMessage errorMessage={errorMessage} />
      <SuccessMessage successMessage={successMessage} />
    </>
  );
};

export default MessageInput;
