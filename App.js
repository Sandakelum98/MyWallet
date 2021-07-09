import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterUser from './components/RegisterUser';
import Income from './components/Income';
import Expense from './components/Expense';
import ResetPassword from './components/ResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default class App extends Component {


  constructor(props) {
    super(props);

    // this.getLoggedUser().then(loggedUser=>{
    //     if(loggedUser != null) {
    //         this.props.navigation.replace('Dashboard');
    //     }
    // });

  }

  //GET DATA FROM ASYNC STORAGE
  getLoggedUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('loggedUser');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Can not Get data from async');
    }
    console.log('Get data from async');
  }


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>

          

          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Dashboard" component={Dashboard}/>
          <Stack.Screen name="RegisterUser" component={RegisterUser}/>
          <Stack.Screen name="Income" component={Income}/>
          <Stack.Screen name="Expense" component={Expense}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword}/>

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
