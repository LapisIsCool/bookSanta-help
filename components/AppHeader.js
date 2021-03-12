import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";

const AppHeader = (props) => {
  return (
    <Header
      backgroundColor="#0c2649"
      centerComponent={{
        text: props.title,
        style: { color: "#f4dda3", fontSize: 20 },
      }}
    />
  );
};

export default AppHeader;
