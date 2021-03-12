import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import BookDonateScreen from "../screens/BookDonateScreen";
import BookRequestScreen from "../screens/BookRequestScreen";

export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks: {
    screen: BookDonateScreen,
    navigationOptions: {
      tabBarLabel: "Donate",
      tabBarOptions: {
        activeBackgroundColor: "#b77b40",
        activeTintColor: "#fadda3",
        inactiveBackgroundColor: "#fadda3",
        inactiveTintColor: "#b77b40",
      },
    },
  },
  RequestBooks: {
    screen: BookRequestScreen,
    navigationOptions: {
      tabBarLabel: "Request",
      tabBarOptions: {
        activeBackgroundColor: "#b77b40",
        activeTintColor: "#fadda3",
        inactiveBackgroundColor: "#fadda3",
        inactiveTintColor: "#b77b40",
      },
    },
  },
});
