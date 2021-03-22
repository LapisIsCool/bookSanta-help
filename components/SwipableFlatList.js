import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  TouchableHighlight,
} from "react-native";
import { ListItem } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import db from "../config";

export default class SwipableFlatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          data={this.state.allNotifications}
          rightOpenValue={-Dimensions.get("window").width}
          leftOpenValue={Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChange}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
        />
      </View>
    );
  }

  onSwipeValueChange = (swipeData) => {
    console.log(swipeData);
    var allNotifications = this.state.allNotifications;
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      const newData = [...allNotifications];
      this.updateMarkAsRead(allNotifications[key]);
      newData.splice(key, 1);
      this.setState({
        allNotifications: newData,
      });
    }
  };

  updateMarkAsread = (notification) => {
    console.log(notification);
    db.collection("AllNotifications")
      .doc(notification.doc_id)
      .update({ notificationStatus: "read" });
  };

  renderItem = (data) => {
    return (
      <TouchableHighlight>
        <Animated.View>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{ color: "#b77b40" }}>
                {data.item.bookName}
              </ListItem.Title>
              <ListItem.Subtitle>{data.item.message}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Animated.View>
      </TouchableHighlight>
    );
  };

  renderHiddenItems = () => {
    return (
      <View style={styles.rowBack}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text style={styles.backTextWhite}>Mark as read</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: "#29b6f6",
    right: 0,
  },
});
