import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Text, Card, Item, Input, Label } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';



export default class Dashboard extends Component {
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
              }}>Type of Expense</Label>
              <Input />
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
              <Input />
            </Item>

            <Item floatingLabel
                style={{
                    margin:15
                }}
            >
              <Label style={{
                  color:'#fff',
                  fontSize:15
              }}>Date</Label>
              <Input />
            </Item>


            <Button rounded light style={{
                backgroundColor:'#fb5b5a',
                width:'60%',
                height:30,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:20,
                marginLeft:50
            }}>
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
            }}>
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
