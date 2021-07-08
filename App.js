import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RegisterUser from './components/RegisterUser';
import Income from './components/Income';
import Expense from './components/Expense';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Dashboard" component={Dashboard}/>
          <Stack.Screen name="RegisterUser" component={RegisterUser}/>
          <Stack.Screen name="Income" component={Income}/>
          <Stack.Screen name="Expense" component={Expense}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
