import { Pressable, Text, StyleSheet } from "react-native";

export const bluePrimary = "rgb(33, 126, 222)";
export const bluePrimaryLight = "rgba(33, 126, 222, 0.5)";
export const bluePrimaryTheLightest = "rgba(33, 126, 222, 0.1)";

export const orangePrimary = "rgb(222, 129, 33)";
export const margin = 5;
export const padding = 15;
export const borderRadius = 15;
export const width50Per = "50%";

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
  containerCentered: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    // backgroundColor: bluePrimaryTheLightest,
    backgroundColor: bluePrimary,
    color: "white",
    margin: margin,
    padding: padding,
    borderRadius: borderRadius,
  },
  // mainChildren: {
  //   alignSelf: "stretch",
  //   backgroundColor: "pink",
  // },
});
