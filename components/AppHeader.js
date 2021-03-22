import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert } from "react-native";
import db from "../config";

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  getNumberOfUnreadNotifications() {
    db.collection("AllNotifications")
      .where("notificationStatus", "==", "unread")
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({
          value: unreadNotifications.length,
        });
      });
  }

  componentDidMount() {
    this.getNumberOfUnreadNotifications();
  }

  BellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#696969"
          size={25}
          onPress={() => {
            this.props.navigation.navigate("Notifications");
          }}
        />
        <Badge
          value={this.state.value}
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        backgroundColor="#0c2649"
        centerComponent={{
          text: this.props.title,
          style: { color: "#f4dda3", fontSize: 20 },
        }}
        containerStyle={{
          paddingTop: 50,
          paddingBottom: 20,
        }}
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#696969"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        rightComponent={<this.BellIconWithBadge {...this.props} />}
      />
    );
  }
}
