/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import Login from './login.js';
import RegView1 from './regView1.js';
import RegView2 from './regView2.js';
import Home from './home.js';
import Forgot from './forgot.js';
import React , {Component} from "react";
import { View, Text ,Button , Platform ,Image} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class LoginScreen extends Component {
    static navigationOptions = {
}
    segueToRegister = () => {
        // this.props.navigation.navigate("Register1");
        Alert.alert("BEEYAACH");

    }
    render(){
        return (<Login navigation = {this.props.navigation}/>);
    }
}

class RegisterScreen1 extends Component {
    render(){
        return (<RegView1 navigation = {this.props.navigation}/>);
    }
}

class ForgotPassScreen extends Component {
    render(){
        return (<Forgot navigation = {this.props.navigation}/>);
    }
}

class RegisterScreen2 extends Component {
    static navigationOptions = {
       headerLeft: null,
       gesturesEnabled: false,
}
    render(){
        return (<RegView2 navigation = {this.props.navigation}/>);
    }
}

class HomeScreen1 extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Home',
            headerLeft:null,
            headerRight: (
              <Button
                onPress={() => navigation.goBack()}
                title="Log out"
                color={Platform.OS=="ios"?"#FFFFFF":"#274690"}
              />
            ),
        };

};


  render() {
    return (<Home navigation = {this.props.navigation}/>);
  }

}




const AppNavigator = createStackNavigator(
    {
        Login : LoginScreen,
        Register1 : RegisterScreen1,
        Register2 : RegisterScreen2,
        Home1:HomeScreen1,
        Forgot:ForgotPassScreen
    },
    {
        initialRouteName : "Login",
        defaultNavigationOptions:{
            headerStyle: {
              backgroundColor: '#274690',
            },
        }
    }
)

const AppContainer = createAppContainer(AppNavigator);
export default class SPM extends Component {
  render() {
    return <AppContainer />;
  }
}
