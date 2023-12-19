import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

const RegisterScreen = function ({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
    fb: "",
    ig: "",
    snapchat: "",
    tiktok: "",
    wa: "",
    otherSocialMedia: "",
    otherSocialMediaUsername: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const [errorMessage, setErrorMessage] = useState("");

  const clearInputFields = () => {
    setFormData(() => ({
      username: "",
      password: "",
      confirmedPassword: "",
      fb: "",
      ig: "",
      snapchat: "",
      tiktok: "",
      wa: "",
      otherSocialMedia: "",
      otherSocialMediaUsername: "",
    }));
  };

  const getAllGivenSocialMedia = (data) => {
    const socialMedia = {};
    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== "username" &&
        key !== "password" &&
        key !== "confirmedPassword" &&
        key !== "otherSocialMedia" &&
        key !== "otherSocialMediaUsername" &&
        value !== ""
      ) {
        socialMedia[key] = value;
      }
    });
    if (
      data["otherSocialMedia"] &&
      data["otherSocialMediaUsername"]
    ) {
      socialMedia[data["otherSocialMedia"]] =
        data["otherSocialMediaUsername"];
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
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);
    console.log("Social Media:", socialMedia);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        {
          username: formData.username,
          password: formData.password,
          haha : "huhu",
          socialMedia : JSON.stringify(socialMedia),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "!!!!!!!!!");
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        console.log(data, "resp");
        setErrorMessage("Successful registration");
      } else {
        setErrorMessage("Log in failed");
      }
    } catch (error) {
      setErrorMessage("Log in failed");
    }
    clearInputFields();
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmedPassword}
        onChangeText={(text) => handleChange("confirmedPassword", text)}
      />
      <TextInput
        placeholder="Facebook"
        value={formData.fb}
        onChangeText={(text) => handleChange("fb", text)}
      />
      <TextInput
        placeholder="Instagram"
        value={formData.ig}
        onChangeText={(text) => handleChange("ig", text)}
      />
      <TextInput
        placeholder="Snapchat"
        value={formData.snapchat}
        onChangeText={(text) => handleChange("snapchat", text)}
      />
      <TextInput
        placeholder="Tik Tok"
        value={formData.tiktok}
        onChangeText={(text) => handleChange("tiktok", text)}
      />
      <TextInput
        placeholder="WhatsApp"
        value={formData.wa}
        onChangeText={(text) => handleChange("wa", text)}
      />
      <View style={styles.horizontalInputsContainer}>
        <TextInput
          placeholder="Other Social Media"
          value={formData.otherSocialMedia}
          // onChangeText={(text) => text}
          onChangeText={(text) => handleChange("otherSocialMedia", text)}
        />
        <TextInput
          placeholder="Username"
          value={formData.otherSocialMediaUsername}
          onChangeText={(text) =>
            handleChange("otherSocialMediaUsername", text)
          }
        />
      </View>
      <Button title="Register" onPress={handleRegister} />
      <Text>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalInputsContainer: {
    flexDirection: "row",
  },
});
export default RegisterScreen;
