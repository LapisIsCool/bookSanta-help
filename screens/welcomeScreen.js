import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      isModalVisble: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showModal()}
        </View>
        <TextInput
          style={styles.loginBox}
          placeholder="abc@example.com"
          placeholderTextColor="#f4dda3"
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          style={styles.loginBox}
          placeholder="Enter Password"
          placeholderTextColor="#f4dda3"
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
          secureTextEntry={true}
        ></TextInput>

        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.userLogin(this.state.email, this.state.password);
            }}
          >
            <Text style={styles.loginButtonText}>Log-in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.setState({
                isModalVisble: true,
              });
            }}
          >
            <Text style={styles.loginButtonText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("DonateBooks");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection("Users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile: this.state.contact,
            user_name: this.state.email,
            address: this.state.address,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => {
                this.setState({ isModalVisible: false });
                this.props.navigation.navigate("DonateBooks");
              },
            },
          ]);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisble}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Register</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                placeholderTextColor="#f4dda3"
                maxLength={10}
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
                maxLength={10}
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
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder={"email"}
                placeholderTextColor="#f4dda3"
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    email: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder={"password"}
                placeholderTextColor="#f4dda3"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder={"confirm Password"}
                placeholderTextColor="#f4dda3"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              ></TextInput>

              <View>
                <TouchableOpacity
                  style={[styles.registerButton, { borderColor: "#b77b40" }]}
                  onPress={() => {
                    this.userSignUp(
                      this.state.email,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}
                >
                  <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({
                      isModalVisble: false,
                    });
                  }}
                >
                  <Text style={styles.loginButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
}

// 0c2649 = dark blue
// b77b40 = dark brown
// dfb670 = middle brown
// f4dda3 = light brown

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c2649",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    width: 250,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "#b77b40",
    color: "#f4dda3",
  },
  loginButton: {
    width: 90,
    height: 30,
    margin: 20,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#dfb670",
  },
  loginButtonText: {
    textAlign: "center",
    color: "#b77b40",
  },
  profileContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#b77b40",
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#dfb670",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: { color: "#b77b40", fontWeight: "200", fontSize: 20 },
  buttonContainer: { flex: 1, alignItems: "center" },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#b77b40",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c2649",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#dfb670",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    color: "#f4dda3",
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: { color: "#b77b40", fontSize: 15, fontWeight: "bold" },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
