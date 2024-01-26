import { StyleSheet } from "react-native";

export const bluePrimary = "rgb(33, 126, 222)";
export const bluePrimaryLight = "rgba(33, 126, 222, 0.5)";
export const bluePrimaryTheLightest = "rgba(33, 126, 222, 0.1)";
export const orangePrimary = "rgb(222, 129, 33)";
export const successColor = "rgb(62, 193, 114)";
export const errorColor = "rgb(215, 40, 52)";
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
  containerVertical: {
    flexDirection: "column",
  },
  containerCentered: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: bluePrimary,
    color: "white",
    margin: margin,
    padding: padding,
    borderRadius: borderRadius,
  },
  commonDrawersOptions: {
    drawerLabelStyle: {
      color: "white",
    },
    drawerStyle: {
      backgroundColor: bluePrimary,
    },
    headerStyle: {
      backgroundColor: bluePrimary,
    },
    headerTintColor: "white",
  },
  textLabel: {
    width: "30%",
    textAlign: "center",
  },
  textValue: {
    width: "30%",
  },
  labelValuecontainer: {
    alignItems: "strech",
    justifyContent: "space-evenly",
    width: width50Per,
  },
  border: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: borderRadius,
  },
});
