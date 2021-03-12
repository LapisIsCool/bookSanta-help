import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import AppHeader from "../components/AppHeader";

export default class SetingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      docID: "",
    };
  }

  render() {
    return (
      <View>
        <AppHeader title="Setings" navigation={this.props.navigation} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"First Name"}
            placeholderTextColor="#f4dda3"
            maxLength={8}
            value={this.state.firstName}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Last Name"}
            placeholderTextColor="#f4dda3"
            maxLength={8}
            value={this.state.lastName}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.formTextInput}
            placeholder={"address"}
            placeholderTextColor="#f4dda3"
            multiline={true}
            value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.formTextInput}
            placeholder={"contact"}
            placeholderTextColor="#f4dda3"
            keyboardType={"numeric"}
            value={this.state.contact}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUser();
            }}
          >
            <Text style={styles.buttonText}>Up-Date</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  getUser() {
    var user = firebase.auth().currentUser;
    var email = user.email;
    db.collection("Users")
      .where("user_name", "==", email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailID: data.user_name,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.mobile,
            docID: doc.id,
          });
        });
      });
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser() {
    db.collection("Users").doc(this.state.docID).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      mobile: this.state.contact,
    });
  }
}

// 0c2649 = dark blue
// b77b40 = dark brown
// dfb670 = middle brown
// f4dda3 = light brown

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  formContainer: { flex: 1, width: "100%", alignItems: "center" },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#b77b40",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0c2649",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: { fontSize: 25, fontWeight: "bold", color: "#f4dda3" },
});
