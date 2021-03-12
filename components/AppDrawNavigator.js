import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenu";
import SetingsScreen from "../screens/SetingsScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
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
