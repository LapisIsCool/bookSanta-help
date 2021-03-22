import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import AppHeader from "../components/AppHeader.js";
import firebase from "firebase";
import db from "../config.js";
import SwipableFlatList from "../components/SwipableFlatList";

export default class NotificationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      allNotifications: [],
    };
    this.notificationRef = null;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader
          navigation={this.props.navigation}
          title="My Notifications"
        />
        <View style={{ flex: 1 }}>
          {this.state.allNotifications.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>You have no Notifications</Text>
            </View>
          ) : (
            <SwipableFlatList
              allNotifications={this.state.allNotifications}
            ></SwipableFlatList>
          )}
        </View>
      </View>
    );
  }

  getNotifications() {
    this.requestRef = db
      .collection("AllNotifications")
      .where("notificationStatus", "==", "unread")
      .where("targetUserID", "==", this.state.userID)
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notif = doc.data();
          notif["docID"] = doc.id;
          allNotifications.push(notif);
        });
        this.setState({
          allNotifications: allNotifications,
        });
      });
  }

  componentDidMount() {
    this.getNotifications();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem key={index} bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ color: "#b77b40" }}>
          {item.bookName}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: "#b77b40" }}>
          {item.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c2649",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "#f4dda3",
  },
});
