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

 export default class RegView2 extends Component {
     constructor(props){
         super(props);
         this.state = {
             otpText:''
         }

     }
     continueButtonPressed = () => {
         Alert.alert("Your password has been set \n Login to continue");
     }
   render() {
     return (
       <View style={styles.container}>
         <View style={styles.b1}></View>
         <View style={styles.b2}>
            <View style={styles.b2b1}>
                <Text style={styles.t1}>Enter the OTP</Text>
                <View style={styles.b2b1b1}>
                    <TextInput
                      style={{height: 43}}
                      placeholder="eg: 347822"
                      onChangeText={(text) => this.setState({otpText:text})}
                      value={this.state.otpText}
                    />
                </View>
                <TouchableHighlight onPress = {this.continueButtonPressed} underlayColor={"#CCCCCC"} activeOpacity={0.5}>
                    <Text style={styles.t1}>Continue</Text>
                </TouchableHighlight>
            </View>
         </View>
         <View style={styles.b1}></View>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
       paddingTop:Platform.OS=="ios"?22:0,
       flex: 1,
       backgroundColor: '#CCCCCC',
   },
   b1:{
       flex:1,
       // backgroundColor:"red",
       margin:3
   },
   b2:{
       flex:4,
       // backgroundColor:"red",
       margin:3
   },
   b2b1:{
       margin:3,
       alignItems:'center',
       paddingTop:5,
       // backgroundColor:"blue",

   },
   t1:{
       fontSize:17,
       color:"black",
   },
   b2b1b1:{
       height:43,
       width:300,
       backgroundColor:"white",
       borderWidth:1,
       paddingLeft:5,
       marginTop:3,
       marginBottom:20
   }
 });
