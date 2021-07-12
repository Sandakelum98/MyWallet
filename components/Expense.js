import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Text, Card, Item, Input, Label } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

let loggedUserId;

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenseDate: '',
      expenseType: '',
      expenseAmount: '',
    };

    //Get user id
    this.getLoggedUser().then(loggedUser => {
      if (loggedUser != null) {
        loggedUserId = loggedUser._id;
      } else {
        loggedUserId = null;
      }
    });
  }

  //GET DATA FROM ASYNC STORAGE
  getLoggedUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loggedUser');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Can not Get data from async')
    }
  }

  addExpense() {
    const expenseData = {
      expenseDate:this.state.expenseDate,
      expenseType:this.state.expenseType,
      expenseAmount:this.state.expenseAmount,
      userId:loggedUserId,
  };

  fetch('http://192.168.1.102:3000/api/v1/expenseRoute/addExpense', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
  }).then(response => response.json())
      .then(json => {
          //console.log(json);
          if (json.message == 'success') {
              alert('Expense added ! ');
             
              this.props.navigation.replace('Dashboard');

          } else {
              alert(json.message);
              console.log(json.error);
          }
      })
      .catch(error => {
          console.log(error);
          alert('Failed');
      });
  }


  render() {
    return (
      <Container>

        <Header style={styles.header}></Header>

        <Content>

          <Card style={styles.card}>

            <Text style={{
                fontSize:22,
                fontWeight:'bold',
                color: '#fb5b5a'
            }}>ADD EXPENSE</Text>


            <Item floatingLabel
                style={{
                    margin:15
                }}
            >
              <Label style={{
                  color:'#fff',
                  fontSize:15
              }}>Date</Label>
              <Input
              style={{
                color:'#fff'
              }}
              onChangeText={(value) => {
                this.setState({
                    expenseDate: value,
                });
            }}
              />
            </Item>

            <Item floatingLabel
                style={{
                    margin:15
                }}
            >
              <Label style={{
                  color:'#fff',
                  fontSize:15
              }}>Type of Expense</Label>
              <Input 
              style={{
                color:'#fff'
              }}
              onChangeText={(value) => {
                this.setState({
                    expenseType: value,
                });
            }}
              />
            </Item>

            <Item floatingLabel
                style={{
                    margin:15
                }}
            >
              <Label style={{
                  color:'#fff',
                  fontSize:15
              }}>Amount</Label>
              <Input 
              keyboardType="numeric"
              style={{
                color:'#fff'
              }}
              onChangeText={(value) => {
                this.setState({
                    expenseAmount: value,
                });
            }}
              />
            </Item>

            


            <Button rounded light style={{
                backgroundColor:'#fb5b5a',
                width:'60%',
                height:30,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:20,
                marginLeft:50
            }}
            onPress={() => {
              // console.log("---------------------------");
              // console.log(this.state.expenseDate+' - '+this.state.expenseType+' - '+this.state.expenseAmount);
              // console.log(loggedUserId);
              this.addExpense();
          }}
            >
                <Text style={{
                    color:"#fff",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>Add</Text>
            </Button>

            <Button rounded light style={{
                backgroundColor:'#fb5b5a',
                width:'60%',
                height:30,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:20,
                marginBottom:20,
                marginLeft:50
            }}
            onPress={() => {
              this.props.navigation.navigate('Dashboard');
            }}
            >
                <Text style={{color:"#fff"}}>Cancel</Text>
            </Button>


          </Card>

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
    marginBottom:15,
    padding:15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c'
  }

})
