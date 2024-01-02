import { Pressable, Text, StyleSheet } from "react-native";

export const bluePrimary = "rgb(33, 126, 222)";
export const bluePrimaryLight = "rgba(33, 126, 222, 0.5)";
export const orangePrimary = "rgb(222, 129, 33)";

export const globalStyles = StyleSheet.create({
  screen: {
    backgroundColor: bluePrimaryLight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerHorizontal: {
    flexDirection: "row",
  },
});
