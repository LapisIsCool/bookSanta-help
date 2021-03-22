import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import AppHeader from "../components/AppHeader";

export default class BookDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      requestedBooksList: [],
    };
    this.requestRef = null;
  }

  getRequestedBooksList = () => {
    this.requestRef = db.collection("BookRequests").onSnapshot((snapshot) => {
      var requestedBooksList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestedBooksList: requestedBooksList,
      });
    });
  };

  componentDidMount() {
    this.getRequestedBooksList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    // console.log(item, index, item.bookName);
    return (
      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.bookName}</ListItem.Title>
          <ListItem.Subtitle>{item.reason}</ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{ color: "#f4dda3" }}
            onPress={() => {
              this.props.navigation.navigate("ReceiverDetails", {
                details: item,
              });
            }}
          >
            View
          </Text>
        </TouchableOpacity>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader title="Donate Books" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.requestedBooksList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20, color: "#dfb670" }}>
                List Of All Requested Books
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedBooksList}
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
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
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
  },
});
