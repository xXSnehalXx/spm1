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
  Alert,
  AsyncStorage
} from "react-native";
import qs from "qs";
import axios from "axios";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reading: "",
      date: "",
      sr: "",
      meter: 123,
      month: 4,
      units: "0"
    };
    this.getData();

    // this.getStoredData("@SavedReadingDate").then((goals) => {Alert.alert(goals)});
    // this.getStoredData("@SavedReadingValue").then((goals) => {Alert.alert(goals)});
  }

  getData = () => {
    const bro = this;
    AsyncStorage.getItem("@SavedReadingDate").then(value =>
      this.setState({ date: value })
    );
    AsyncStorage.getItem("@SavedReadingValue").then(value => {
      this.setState({ sr: value });
      setInterval(() => bro.getLiveReading(bro.state.meter), 2000); //Putting it here so that when units are calculated first time error wont come
    });
  };
  saveData = async (date, reading) => {
    AsyncStorage.setItem("@SavedReadingDate", date).then(() => this.getData());
    AsyncStorage.setItem("@SavedReadingValue", reading).then(() => {
      this.getData();
      this.setState({ units: 0 });
    });
  };

  saveButtonPressed = () => {
    var today = new Date();
    date =
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      "/" +
      (parseInt(today.getMonth() + 1) < 10
        ? "0" + parseInt(today.getMonth() + 1)
        : parseInt(today.getMonth() + 1)) +
      "/" +
      today
        .getFullYear()
        .toString()
        .substr(-2);
    time = `${
      today.getHours() < 10 ? "0" + today.getHours() : today.getHours()
    }:${
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
    }`;
    fullDate = date + " " + time;

    this.saveData(fullDate, this.state.reading);
  };

  statisticsButtonPressed = () => {
    Alert.alert("statistics pressed");
  };

  getLiveReading = () => {
    const self = this;
    const data = {
      meter: this.state.meter
    };

    const url = Platform.select({
      ios: "http://localhost/rpi/getLiveReading.php",
      android: "http://10.0.2.2/rpi/getLiveReading.php"
    });

    axios({
      method: "POST",
      url: url,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data)
    })
      .then(function(response) {
        console.log(response);
        self.setState({
          reading: response.data.reading
        });
        var oldUnits = parseInt(self.state.sr);
        var newUnits = parseInt(response.data.reading);
        var un = newUnits - oldUnits;
        self.setState({
          units: un
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  billButtonPressed = () => {
    const self = this;
    const data = {
      meter: this.state.meter,
      month: this.state.month
    };
    const url = Platform.select({
      ios: "http://localhost/rpi/calculateTariff.php",
      android: "http://10.0.2.2/rpi/calculateTariff.php"
    });
    axios({
      method: "POST",
      url: url,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data)
    })
      .then(function(response) {
        var cost = "Rs " + response.data.cost;
        Alert.alert(cost);
      })
      .catch(function(error) {
        console.log(error);
        Alert.alert("Error");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.b1, { marginTop: 30 }]}>
          <ReadingBox read={this.state.reading} />
        </View>
        <View style={styles.b1}>
          <View style={styles.infoBox}>
            <View style={styles.infoBoxInside}>
              <Text style={styles.infoText}>Last save on</Text>
            </View>
            <View style={styles.infoBoxInside}>
              <Text style={styles.infoText}>: {this.state.date}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoBoxInside}>
              <Text style={styles.infoText}>Reading </Text>
            </View>
            <View style={styles.infoBoxInside}>
              <Text style={styles.infoText}>: {this.state.sr}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoBoxInside}>
              <Text style={styles.infoText}>Units</Text>
            </View>
            <View style={styles.infoBoxInside}>
              <Text style={styles.infoText}>: {this.state.units}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.b1, { alignItems: "center" }]}>
          <TouchableHighlight
            onPress={this.saveButtonPressed}
            underlayColor={"#CCCCCC"}
            activeOpacity={0.5}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.b1,
            { justifyContent: "space-between", flexDirection: "row" }
          ]}
        >
          <TouchableHighlight
            onPress={this.billButtonPressed}
            underlayColor={"#CCCCCC"}
            activeOpacity={0.5}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Approx bill</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.statisticsButtonPressed}
            underlayColor={"#CCCCCC"}
            activeOpacity={0.5}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Statistics</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
// const InfoBox = (props) => {
//     return(
//       <View>
//
//       </View>
//     );
// }

const ReadingBox = props => {
  return (
    <View>
      <Text style={styles.liveText}>Live</Text>
      <View style={styles.liveReading}>
        <Text style={styles.liveReadingNumber}>{props.read}</Text>
        <Text style={styles.liveReadingKWH}>kwh</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 22 : 0,
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  b1: {
    // backgroundColor: 'red',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
    marginBottom: 4,
    minHeight: 40
  },
  liveReading: {
    height: 100,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#707070",
    alignItems: "center",
    justifyContent: "center"
  },
  liveText: {
    fontSize: 25,
    color: "#5D5360"
  },
  liveReadingKWH: {
    fontSize: 22,
    color: "#5D5360",
    position: "absolute",
    right: 4,
    top: 40
  },
  liveReadingNumber: {
    fontSize: 35,
    color: "#5D5360"
  },
  infoBox: {
    minHeight: 30,
    margin: 3,
    flexDirection: "row"
    // justifyContent:'space-between'
  },
  infoText: {
    color: "#000000",
    fontSize: 18
  },
  infoBoxInside: {
    margin: 2,
    flex: 1
  },
  button: {
    backgroundColor: "#68B0AB",
    borderWidth: 0.5,
    borderColor: "black",
    // width:60,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    margin: 5
  }
});
