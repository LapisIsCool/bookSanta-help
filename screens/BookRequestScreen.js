import firebase from "firebase";
import React from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import db from "../config";

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      bookName: "",
      reason: "",
    };
  }

  createUniqueID() {
    return Math.random().toString(36).substring(7);
  }

  addRequest(bookName, reason) {
    var userID = this.state.userID;
    var requestID = this.createUniqueID();

    db.collection("BookRequests").add({
      userID: userID,
      bookName: bookName,
      reason: reason,
      requestID: requestID,
    });

    this.setState({
      bookName: "",
      reason: "",
    });

    Alert.alert("Book Requested Successfully");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader title="Request Book" />
        <KeyboardAvoidingView>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Book Name"}
            placeholderTextColor="#f4dda3"
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
            value={this.state.bookName}
          ></TextInput>

          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            placeholder={"Why do you want the book?"}
            placeholderTextColor="#f4dda3"
            onChangeText={(text) => {
              this.setState({
                reason: text,
              });
            }}
            value={this.state.reason}
            multiline
            numberOfLines={8}
          ></TextInput>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reason);
            }}
          >
            <Text style={{ color: "#b77b40" }}>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

// 0c2649 = dark blue
// b77b40 = dark brown
// dfb670 = middle brown
// f4dda3 = light brown

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#b77b40",
    color: "#f4dda3",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#dfb670",
    shadowColor: "#000",
    color: "#f4dda3",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
