import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

import {
  SOCIAL_MEDIA_PLATFORMS,
  SOCIAL_MEDIA_PLATFORMS_NAMES,
} from "../utils/constants";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import { globalStyles } from "../utils/stylesConstants";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { getStringErrorMessage } from "../utils/functions";

const RegisterScreen = function ({ navigation }) {

  const initialSocialMedia = SOCIAL_MEDIA_PLATFORMS.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});
  const initialInputs = {
    username: "",
    password: "",
    confirmedPassword: "",
    ...initialSocialMedia,
    otherSocialMedia: "",
    otherSocialMediaUsername: "",
  };
  const [formData, setFormData] = useState(initialInputs);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearInputFields = () => {
    setFormData(() => initialInputs);
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setErrorMessage("");
      setSuccessMessage("");
    });
  }, [navigation]);

  const getAllGivenSocialMedia = (data) => {
    const socialMedia = {};
    Object.entries(data).forEach(([key, value]) => {
      if (SOCIAL_MEDIA_PLATFORMS.includes(key) && value !== "") {
        socialMedia[key] = value;
      }
    });
    if (data["otherSocialMedia"] && data["otherSocialMediaUsername"]) {
      socialMedia[data["otherSocialMedia"]] = data["otherSocialMediaUsername"];
    }
    return socialMedia;
  };

  const handleRegister = async () => {
    setErrorMessage("");
    if (!formData.username || !formData.password) {
      setErrorMessage("Username and Password cannot be empty");
      return;
    }
    if (formData.password !== formData.confirmedPassword) {
      setErrorMessage("Password and confirmed password don't match");
      return;
    }
    if (!formData.otherSocialMedia && formData.otherSocialMediaUsername) {
      setErrorMessage("No name for other social media");
      return;
    }
    if (formData.otherSocialMedia && !formData.otherSocialMediaUsername) {
      setErrorMessage("No username for other social media");
      return;
    }
    const socialMedia = getAllGivenSocialMedia(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        {
          username: formData.username,
          password: formData.password,
          social_media: JSON.stringify(socialMedia),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setSuccessMessage("Successful registration");
        clearInputFields();
      } else {
        setErrorMessage("Registration failed");
      }
    } catch (error) {
      const eMObj = error?.response?.data;
      if (eMObj) {
        const eMStr = getStringErrorMessage(eMObj);
        setErrorMessage(eMStr);
      } else {
        setErrorMessage("Registration failed");
      }
    }
  };

  return (
    <View style={globalStyles.screen}>
      <MyTextInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <MyTextInput
        placeholder="Password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        isHidden={true}
      />
      <MyTextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={formData.confirmedPassword}
        onChangeText={(text) => handleChange("confirmedPassword", text)}
      />
      {SOCIAL_MEDIA_PLATFORMS.map((item, index) => (
        <MyTextInput
          placeholder={SOCIAL_MEDIA_PLATFORMS_NAMES[item]}
          value={formData[item]}
          onChangeText={(text) => handleChange(item, text)}
          key={index}
        />
      ))}
      <View style={globalStyles.containerHorizontal}>
        <MyTextInput
          placeholder="Other Social Media"
          value={formData.otherSocialMedia}
          onChangeText={(text) => handleChange("otherSocialMedia", text)}
        />
        <MyTextInput
          placeholder="Other Social Media Username"
          value={formData.otherSocialMediaUsername}
          onChangeText={(text) =>
            handleChange("otherSocialMediaUsername", text)
          }
        />
      </View>
      <MyButton title="Register" onPress={handleRegister} />
      <ErrorMessage errorMessage={errorMessage} />
      <SuccessMessage successMessage={successMessage} />
    </View>
  );
};

export default RegisterScreen;
