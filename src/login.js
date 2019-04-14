/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import qs from "qs";
import axios from "axios";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loginText:'',
      // passwordText:''
      loginText: "9246",
      passwordText: "snehal"
    };

    //FOR AUTOMATIC LOGIN
    this.loginButtonPressed();
    //FOR AUTOMATIC LOGIN
  }

  loginButtonPressed = () => {
    var pass = this.state.passwordText;
    var username = this.state.loginText;
    pass = pass.trim();
    const self = this;
    const data = {
      phone: username,
      pass: pass
    };
    const url = Platform.select({
      ios: "http://localhost/rpi/login.php",
      android: "http://10.0.2.2/rpi/login.php"
    });

    axios({
      method: "POST",
      url: url,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data)
    })
      .then(function(response) {
        console.log(response);
        var data = response.data;
        // Alert.alert(JSON.stringify(data))
        if (data.secret == "XoReTu") {
          self.props.navigation.navigate("Home1", {
            meter: data.meter
          });
        } else {
          Alert.alert("Unsuccessful");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // loginButtonPressed = () => {
  //     this.props.navigation.navigate("Home1");
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#CCCCCC" />
        <View style={styles.b1}>
          <View style={styles.b1b1}>
            <Text style={styles.topText}>Smart Pocket Meter</Text>
          </View>
          <View style={styles.b1b2}>
            <View style={styles.b1b2b}>
              <Text style={styles.otherText}>Unique service number</Text>
              <View style={styles.b1b2bb}>
                <TextInput
                  style={{ height: 43 }}
                  placeholder="eg: 2438988"
                  onChangeText={text => this.setState({ loginText: text })}
                  value={this.state.loginText}
                />
              </View>
            </View>
            <View style={styles.b1b2b}>
              <Text style={styles.otherText}>Password</Text>
              <View style={styles.b1b2bb}>
                <TextInput
                  style={{ height: 43 }}
                  placeholder="eg: helloduck"
                  onChangeText={text => this.setState({ passwordText: text })}
                  value={this.state.passwordText}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <View style={styles.b1b2b}>
              <TouchableHighlight
                onPress={this.loginButtonPressed}
                underlayColor={"#CCCCCC"}
                activeOpacity={0.5}
              >
                <Text style={styles.otherText}>Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.b2}>
          <View style={styles.b2b}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Register1")}
              underlayColor={"#CCCCCC"}
              activeOpacity={0.5}
            >
              <Text style={styles.otherText}>Register</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.b2b}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Forgot")}
              underlayColor={"#CCCCCC"}
              activeOpacity={0.5}
            >
              <Text style={styles.otherText}>Forgot your password?</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 22 : 0,
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  b1: {
    flex: 2,
    // backgroundColor:"brown",
    margin: 4
  },
  b1b1: {
    flex: 1,
    // backgroundColor:"aquamarine",
    margin: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  b1b2: {
    flex: 2,
    // backgroundColor:"aquamarine",
    margin: 4,
    alignItems: "center"
  },
  topText: {
    fontSize: 26,
    color: "#274690"
  },
  b1b2b: {
    margin: 4,
    flex: 1
    // backgroundColor:"brown",
  },
  otherText: {
    fontSize: 15,
    color: "#000000"
  },
  b1b2bb: {
    height: 43,
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 1
  },
  b2: {
    flex: 1,
    // backgroundColor:"brown",
    margin: 4,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  b2b: {
    height: 40,
    margin: 4
    // backgroundColor:"aquamarine"
  }
});
