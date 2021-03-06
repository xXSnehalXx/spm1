/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  Alert
} from 'react-native';
import {NativeModules} from 'react-native';
import ToastExample from './ToastExample';


export default class NativeModuleTest extends Component {
    performOperation = () => {
        if(Platform.OS == 'ios')
        {
            var CalendarManager = NativeModules.CalendarManager;
            var date = new Date();
            CalendarManager.addEvent(
              'Lambtalk',
              'Malkajgiri',
              date.getTime(),
            );
            CalendarManager.findEvents((error, events) => {
              if (error) {
                console.error(error);
              } else {
                console.log(events);
              }
            });
            CalendarManager.addName('Snehal','20',(error, events) => {
              if (error) {
                console.error(error);
              } else {
                console.log(events);
              }
            });
            console.log(CalendarManager.firstDayOfTheWeek);
        }
        else
        {
            ToastExample.show('Oh it worked', ToastExample.SHORT);
            ToastExample.measureLayout(
              100,
              100,
              (msg) => {
                console.log(msg);
              },
              (x, y, width, height) => {
                console.log(x + ':' + y + ':' + width + ':' + height);
              },
            );
        }
    }

  render() {
    return (
      <View style={styles.container}>
      <Button
        onPress={this.performOperation}
        title="Test"
        color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingTop:Platform.OS=="ios"?22:0,
      flex: 1,
      backgroundColor: '#CCCCCC',
      alignItems:'center',
      justifyContent:'center'
      },
});
