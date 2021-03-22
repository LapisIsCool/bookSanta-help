import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenu";
import SetingsScreen from "../screens/SetingsScreen";
import MyDonationsScreen from "../screens/MyDonationsScreen";
import NotificationScreen from "../screens/NotificationScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    MyDonations: {
      screen: MyDonationsScreen,
    },
    Notifications: {
      screen: NotificationScreen,
    },
    Setings: {
      screen: SetingsScreen,
    },
  },
  { contentComponent: CustomSideBarMenu },
  {
    initialRouteName: "Home",
  }
);
