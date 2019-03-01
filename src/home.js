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
   Platform,
   StyleSheet,
   Text,
   View,
   StatusBar,
   TextInput,
   TouchableHighlight,
   Alert
 } from 'react-native';
 export default class Home extends Component {

     saveButtonPressed = () => {
         Alert.alert("Login pressed");
     }
     billButtonPressed = () => {
         Alert.alert("bill pressed");
     }
     statisticsButtonPressed = () => {
         Alert.alert("statistics pressed");
     }
   render() {
     return (
       <View style={styles.container}>
            <View style={[styles.b1,{marginTop:30}]}>
                <ReadingBox/>
            </View>
            <View style={styles.b1}>
                <InfoBox/>
            </View>
            <View style={[styles.b1,{alignItems:'center'}]}>
                <TouchableHighlight onPress = {this.saveButtonPressed} underlayColor={"#CCCCCC"} activeOpacity={0.5}>
                    <View style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={[styles.b1,{justifyContent:'space-between',flexDirection:'row',}]}>
            <TouchableHighlight onPress = {this.billButtonPressed} underlayColor={"#CCCCCC"} activeOpacity={0.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Approx bill</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress = {this.statisticsButtonPressed} underlayColor={"#CCCCCC"} activeOpacity={0.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Statistics</Text>
                </View>
            </TouchableHighlight>
            </View>
       </View>
     );
   }
 }
const InfoBox = () => {
    return(
      <View>
          <View style={styles.infoBox}>
              <View style={styles.infoBoxInside}><Text style={styles.infoText}>Last save on</Text></View>
              <View style={styles.infoBoxInside}><Text style={styles.infoText}>: 23/02/19 15:34</Text></View>
          </View>
          <View style={styles.infoBox}>
              <View style={styles.infoBoxInside}><Text style={styles.infoText}>Reading </Text></View>
              <View style={styles.infoBoxInside}><Text style={styles.infoText}>: 23354.18</Text></View>
          </View>
          <View style={styles.infoBox}>
              <View style={styles.infoBoxInside}><Text style={styles.infoText}>Units</Text></View>
              <View style={styles.infoBoxInside}><Text style={styles.infoText}>: 83.16</Text></View>
          </View>
      </View>
    );
}

const ReadingBox = () => {
    return(
      <View>
          <Text style={styles.liveText}>Live</Text>
          <View style={styles.liveReading}>
              <Text style={styles.liveReadingNumber}>24454.23</Text>
              <Text style={styles.liveReadingKWH}>kwh</Text>
          </View>
      </View>
    );
}

 const styles = StyleSheet.create({
     container: {
         paddingTop:Platform.OS=="ios"?22:0,
         flex: 1,
         backgroundColor: '#CCCCCC',
     },
     b1:{
        // backgroundColor: 'red',
        marginLeft:20,
        marginRight:20,
        marginTop:4,
        marginBottom:4,
        minHeight:40,
     },
     liveReading:{
         height:100,
         backgroundColor:'white',
         borderWidth:2,
         borderRadius:25,
         borderColor:'#707070',
         alignItems:'center',
         justifyContent:'center',
     },
     liveText:{
         fontSize:25,
         color:'#5D5360',
     },
     liveReadingKWH:{
         fontSize:22,
         color:'#5D5360',
         position:'absolute',
         right:4,
         top:40
     },
     liveReadingNumber:{
         fontSize:35,
         color:'#5D5360',
     },
     infoBox:{
         minHeight:30,
         margin:3,
         flexDirection:'row',
         // justifyContent:'space-between'
     },
     infoText:{
         color:'#000000',
         fontSize:18
     },
     infoBoxInside:{
         margin:2,
         flex:1
     },
     button:{
         backgroundColor:'#68B0AB',
         borderWidth:0.5,
         borderColor:"black",
         // width:60,
         height:40,
         borderRadius:15,
         alignItems:'center',
         justifyContent:'center'

     },
     buttonText:{
         color:'white',
         fontSize:18,
         margin:5
     }

 });
