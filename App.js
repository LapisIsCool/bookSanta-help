import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import WelcomeScreen from "./screens/welcomeScreen";
import { AppTabNavigator } from "./components/AppTabNavigator";
import { AppDrawerNavigator } from "./components/AppDrawNavigator";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(switchNavigator);

// 0c2649 = dark blue
// b77b40 = dark brown
// dfb670 = middle brown
// f4dda3 = light brown
