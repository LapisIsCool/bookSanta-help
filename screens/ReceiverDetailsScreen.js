import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class ReceiverDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.navigation.getParam("details"));
    this.state = {
      userID: firebase.auth().currentUser.email,
      receiverID: this.props.navigation.getParam("details")["userID"],
      requestID: this.props.navigation.getParam("details")["requestID"],
      bookName: this.props.navigation.getParam("details")["bookName"],
      reason: this.props.navigation.getParam("details")["reason"],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverDocID: "",
    };
  }

  componentDidMount() {
    this.getReceiverDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#696969"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Donate Books",
              style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor="#eaf8fe"
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Book Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold", color: "#f4dda3" }}>
                Name : {this.state.bookName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold", color: "#f4dda3" }}>
                Reason : {this.state.reason}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Reciever Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold", color: "#f4dda3" }}>
                Name: {this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold", color: "#f4dda3" }}>
                Contact: {this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold", color: "#f4dda3" }}>
                Address: {this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.receiverID !== this.state.userID ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateBookStatus();
                this.addNotification();
                this.props.navigation.navigate("MyDonations");
              }}
            >
              <Text style={{ color: "#f4dda3" }}>I want to Donate</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }

  getReceiverDetails() {
    db.collection("Users")
      .where("user_name", "==", this.state.receiverID)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name,
            receiverContact: doc.data().mobile,
            receiverAddress: doc.data().address,
          });
        });
      });
  }

  updateBookStatus = () => {
    db.collection("BookDonations").add({
      bookName: this.state.bookName,
      requestID: this.state.requestID,
      requestedBy: this.state.receiverName,
      donorID: this.state.userID,
      requestStatus: "donorInterest",
    });
  };

  addNotification = () => {
    var message = "Someone has shown interest in donating your book";
    db.collection("AllNotifications").add({
      targetUserID: this.state.receiverID,
      donorID: this.state.userID,
      requestID: this.state.requestID,
      bookName: this.state.bookName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notificationStatus: "unread",
      message: message,
    });
  };
}

// 0c2649 = dark blue
// b77b40 = dark brown
// dfb670 = middle brown
// f4dda3 = light brown

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0c2649",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
});
