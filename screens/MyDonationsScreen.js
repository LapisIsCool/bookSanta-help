import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import AppHeader from "../components/AppHeader.js";
import firebase from "firebase";
import db from "../config.js";

export default class MyDonationScreen extends Component {
  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      allDonations: [],
    };
    this.requestRef = null;
  }

  getAllDonations = () => {
    this.requestRef = db
      .collection("BookDonations")
      .where("donorID", "==", this.state.userID)
      .onSnapshot((snapshot) => {
        var allDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation["docID"] = doc.id;
          allDonations.push(donation);
        });
        this.setState({
          allDonations: allDonations,
        });
      });
  };

  sendNotification = (bookDetails, requestStatus) => {
    var requestID = bookDetails.requestID;
    var donorID = bookDetails.donorID;
    db.collection("AllNotifications")
      .where("requestID", "==", requestID)
      .where("donorID", "==", donorID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = "";
          if (requestStatus === "Book Sent") {
            message = "Your book is on its way!";
          } else {
            message = "Someone has shown interest in donating your book";
          }
          db.collection("AllNotifications").doc(doc.id).update({
            message: message,
            notificationStatus: "unread",
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  sendBook = (bookDetails) => {
    console.log(bookDetails);
    if (bookDetails.requestStatus === "Book Sent") {
      var requestStatus = "donorInterest";
      db.collection("BookDonations").doc(bookDetails.docID).update({
        requestStatus: requestStatus,
      });
      this.sendNotification(bookDetails, requestStatus);
    } else {
      var requestStatus = "Book Sent";
      db.collection("BookDonations").doc(bookDetails.docID).update({
        requestStatus: requestStatus,
      });
      this.sendNotification(bookDetails, requestStatus);
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem key={index} bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ color: "#b77b40" }}>
          {item.bookName}
        </ListItem.Title>
      </ListItem.Content>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.sendBook(item);
        }}
      >
        <Text style={{ color: "#f4dda3" }}>Send Book</Text>
      </TouchableOpacity>
    </ListItem>
  );

  componentDidMount() {
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader navigation={this.props.navigation} title="My Donations" />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all book Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

// 0c2649 = dark blue
// b77b40 = dark brown
// dfb670 = middle brown
// f4dda3 = light brown

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
