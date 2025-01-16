import { StyleSheet } from "react-native";
// thema claro de la app
export const lightTheme = StyleSheet.create({
  main: {
    backgroundColor: "white",
    textColor: "black",
    borderColor: "gray",
    color: "black",
  },  
  inputLabel: {
    backgroundColor: "#F3F3F3",
    borderColor: "gray",
    textColor: "black",
    color: "black",
  },
  buttonGestor: {
    backgroundColor: "rgb(194, 223, 255)",
    textColor: "black",
    color: "black",
  },
});
//thema oscuro de la app
export const darkTheme = StyleSheet.create({
  main: {
    backgroundColor: "#212121",
    textColor: "white",
    borderColor: "black",
    color: "white",
  },  
  inputLabel: {
    backgroundColor: "#2E2E2E",
    textColor: "white",
    borderColor: "black",
    color: "white",
  },
  buttonGestor: {
    backgroundColor: "rgb(0 41 85)",
    textColor: "white",
    color: "white",
  },
});