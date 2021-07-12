import React, { Component } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, ActionSheet, Card, CardItem } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pie from 'react-native-pie';

let loggedUserId;
var baseUrl = 'http://192.168.1.102:3000/api/v1/';

let totalIncome = 0;
let totalExpense = 0;
let currentBalance = 0;

export default class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.getLoggedUser().then(loggedUser=>{
      if(loggedUser != null) {
        loggedUserId = loggedUser._id;
        this.getAllIncome();
        this.getAllExpense();
      } else {
        loggedUserId = null;
      }
    });
    this.state = {
      totalIncome: 0,
      totalExpense: 0,
      currentBalance: 0,
    };
  }


  //GET DATA FROM ASYNC STORAGE
  getLoggedUser = async () => {
    try {
      // console.log('start get logger user');
      const jsonValue = await AsyncStorage.getItem('loggedUser');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Can not Get data from async')
    }
  }


  //LOGOUT
  logout = async () => {
    try {
      await AsyncStorage.removeItem('loggedUser');
      console.log('deleted data from async');
      this.getLoggedUser().then(loggedUser=>{
        if(loggedUser != null) {
          alert('Not Logout !');
        } else {
          this.props.navigation.replace('Login');
        }
      });
    } catch(e) {
      console.log('Can not delete data from async');
    }
    //console.log('Done.');
  }


  //GET All INCOMES
  getAllIncome = async () => {
    // console.log('Worked GET All INCOMES method');

    //get current year & month
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    const data = {
      userId: loggedUserId,
      month: year + '-' + month,
    };
    // console.log(data);

    fetch(baseUrl + 'incomeRoute/getAllIncomes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => response.json())
      .then(json => {

        // console.log(json);

        let val = json.data;
        totalIncome = 0;
        for (const i in val) {
          // console.log(val[i].incomeAmount);

          let incomeAmount = val[i].incomeAmount;

          totalIncome += incomeAmount;
        }

        this.setState({
          totalIncome: totalIncome,
        });
        // console.log("Total income is : "+totalIncome);
        this.getCurrentBalance();
      })
      .catch(error => {
        console.log(error);
        alert('Failed');
    });
  }


  //GET All EXPENSES
  getAllExpense = async () => {
    // console.log('Worked GET All INCOMES method');

    //get current year & month
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    const data = {
      userId: loggedUserId,
      month: year + '-' + month,
    };
    // console.log(data);

    fetch(baseUrl + 'expenseRoute/getAllExpenses', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => response.json())
      .then(json => {

        // console.log(json);

        let val = json.data;
        totalExpense = 0;
        for (const i in val) {
          // console.log(val[i].incomeAmount);

          let expenseAmount = val[i].expenseAmount;

          totalExpense += expenseAmount;
        }

        this.setState({
          totalExpense: totalExpense,
        });
        // console.log("Total Expense is : "+totalExpense);
        this.getCurrentBalance();

      })
      .catch(error => {
        console.log(error);
        alert('Failed');
      });
  }


  //GET CURRENT BALANCE
  getCurrentBalance = async () => {
    currentBalance = 0;
    currentBalance = totalIncome - totalExpense;
    this.setState({
      currentBalance: currentBalance,
    });
    // console.log("Current Balace is : "+currentBalance);
  }


  render() {
    return (
      <Container>

        <Header style={styles.header}>
          <Left>
            <Button transparent
            onPress={()=>{
              Alert.alert(
                "LOGOUT",
                "Are you sure, do you want to logout ? ",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "logout", onPress: () => this.logout() }
                ]
              );
          }}
            >
              <Entypo name="dots-three-horizontal" size={30} color="#fff" />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right />
        </Header>

        <Content>

          {/* Main Card */}
          <Card style={styles.card}>

            {/* Current Balance */}
            <View style={{
              alignItems:"center",
              justifyContent:"center",
              marginBottom:30
            }}>
              <Text style={{
                color:"#fff",
                fontSize:20
              }}>Current Balance</Text>

              <Text style={{
                color:"#fb5b5a",
                fontSize:30,
                fontWeight:'bold',
                alignItems:"center",
                justifyContent:"center",
              }}>{this.state.currentBalance}</Text>

            </View>


            <CardItem style={{
              backgroundColor: '003f5c'
            }}>

              <Left>
                <Text style={{
                  marginLeft: 0,
                  color: '#fff'
                }}>INCOME</Text>
              </Left>

              <Text style={{
                color: '#fff'
              }}>{this.state.totalIncome}</Text>

              <Right>
                <TouchableOpacity
                  onPress={() => {
                    
                    // console.log('Logged user id : ',loggedUserId);
                    this.props.navigation.navigate('Income');
                  }}
                >
                  <Entypo name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#fb5b5a'
                    }}
                  />
                </TouchableOpacity>
              </Right>

            </CardItem>


            <CardItem style={{
              backgroundColor: '003f5c'
            }}>
              <Left>
                <Text style={{
                  marginLeft: 0,
                  color: '#fff'
                }}>EXPENCE</Text>
              </Left>
              <Text style={{
                color: '#fff'
              }}>{this.state.totalExpense}</Text>
              <Right>
              <TouchableOpacity
                onPress={()=>{
                  // console.log("Hello 2");
                  this.props.navigation.navigate('Expense');
              }}
                >
                  <Entypo name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#fb5b5a'
                    }}
                  />
                </TouchableOpacity>
              </Right>
            </CardItem>

          </Card>


          
          {/* chart */}
          <View
            style={{
              paddingVertical: 15,
              flexDirection: 'row',
              width: 350,
              marginLeft:40
            }}
          >
              <Pie
              radius={120}
              sections={[
                {
                  percentage: 10,
                  color: '#ff5252',
                },
                {
                  percentage: 20,
                  color: '#84817a',
                },
                {
                  percentage: 30,
                  color: '#2c2c54',
                },
                {
                  percentage: 40,
                  color: '#ffb142',
                },
              ]}
              strokeCap={'butt'}
            />

          </View>

          
          {/* <Button style={{
              marginLeft:110,
              marginTop:60,
              marginBottom:100,
          }}
          onPress={()=>{
                this.getAllIncome();
          }}
          >
            <Text>GET TOTAL</Text>
          </Button> */}

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  header:{
    backgroundColor: '#003f5c',
    height:40,
    width:"100%"
  },
  card:{
    marginLeft:15,
    marginRight:15,
    marginTop:15,
    marginBottom:25,
    padding:15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c'
  }

})
