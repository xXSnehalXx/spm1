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

 export default class RegView1 extends Component {
     constructor(props){
         super(props);
         this.state = {
             usnText:'',
             passText:'',
             rePassText:''
         }

     }
     requestButtonPressed = () => {
         if((this.state.usnText != "") && (this.state.passText != "") && (this.state.rePassText != "")){
             if(this.state.passText != this.state.rePassText)
                {
                    Alert.alert(
                      'Enter same passwords',
                      '',
                      [
                        {text: 'Ok'},
                      {cancelable: false},
                  ]
                    );
                    this.setState({passText:'' , rePassText:''})
                }
                else {
                    Alert.alert(
                      'OTP sent',
                      'Please check your registered mobile number',
                      [
                        {text: 'Ok', onPress: () => this.props.navigation.navigate("Register2")},
                      {cancelable: false},
                  ]
                    );
                }
         } else {
             Alert.alert(
               'Enter all details',
               '',
               [
                 {text: 'Ok'},
               {cancelable: false},
           ]
             );
         }

     }
   render() {
     return (
       <View style={styles.container}>
             <View style={styles.b1}></View>
             <View style={styles.b2}>
                 <View style={styles.b2b1}>
                    <Text style={styles.t1}>Enter Unique service number</Text>
                    <View style={styles.b2b1b1}>
                        <TextInput
                          style={{height: 43}}
                          placeholder="eg: 2438988"
                          onChangeText={(text) => this.setState({usnText:text})}
                          value={this.state.usnText}
                        /></View>
                 </View>
                 <View style={styles.b2b1}>
                    <Text style={styles.t1}>Enter password</Text>
                    <View style={styles.b2b1b1}>
                        <TextInput
                          style={{height: 43}}
                          placeholder="eg: helloduck"
                          onChangeText={(text) => this.setState({passText:text})}
                          value={this.state.passText}
                          secureTextEntry = {true}
                        />
                    </View>
                 </View>
                 <View style={styles.b2b1}>
                    <Text style={styles.t1}>Re-Type password</Text>
                    <View style={styles.b2b1b1}>
                        <TextInput
                          style={{height: 43}}
                          placeholder="eg: helloduck"
                          onChangeText={(text) => this.setState({rePassText:text})}
                          value={this.state.rePassText}
                          secureTextEntry = {true}
                        />
                    </View>
                 </View>
                 <View style={styles.b2b1}>
                     <TouchableHighlight onPress = {this.requestButtonPressed} underlayColor={"#CCCCCC"} activeOpacity={0.5}>
                        <Text style={[styles.t1,{color:"#3D348B"}]}>Request OTP</Text>
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
       margin:3
   },
   b2:{
       flex:4,
       margin:3,
   },
   b2b1:{
       margin:3,
       alignItems:'center',
       paddingTop:5

   },
   t1:{
       fontSize:17,
       color:"black"
   },
   b2b1b1:{
       height:43,
       width:300,
       backgroundColor:"white",
       borderWidth:1,
       paddingLeft:5,
       marginTop:3,
   }
 });
