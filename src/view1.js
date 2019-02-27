/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from "react";
import { View, Text ,Button , Platform ,Image} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
    static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#274690',
    },
    // headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="INFO"
        color={Platform.OS=="ios"?"#FFFFFF":"#f4511e"}
      />
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details',{
                itemId : 84
            })
          }}
        />
      </View>
    );
  }
}
class DetailsScreen extends React.Component {
  //   static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: JSON.stringify(navigation.getParam('itemId', 'No id')),
  //   };
  // };
  static navigationOptions = ({ navigation}) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title={`${JSON.stringify(navigation.getParam('increaseCount'))}`}
          color="#fff"
        />
      ),
    };
  };
  constructor(props){
      super(props);
      this.state={
          count:0
      };
  }
  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }


  _increaseCount = () => {
    this.setState((state)=>{ count:state.count + 1 });
  };
  //every navigated or pushed view comes with a back butotn on left , if i dont want
  //i can use headerLeft:null in navigationOptions
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    const paramList = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>{JSON.stringify(paramList)?JSON.stringify(paramList):"Nothing here"}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
class LogoTitle extends React.Component {
  render() {
    return (
        <Image
    source={{
      uri: 'https://facebook.github.io/react/logo-og.png',
      method: 'POST',
      headers: {
        Pragma: 'no-cache',
      },
      body: 'Your Body goes here',
    }}
    style={{width: 30, height: 30}}
  />
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class NavApp extends React.Component {
  render() {
    return <AppContainer />;
  }
}
