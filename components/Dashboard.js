import React, { Component } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, ActionSheet, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Col, Row, Grid } from 'react-native-easy-grid';



export default class Dashboard extends Component {
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
                  { text: "logout", onPress: () => console.log("OK Pressed") }
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
              }}>63 500</Text>

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
              }}>85 000</Text>

              <Right>
                <TouchableOpacity
                  onPress={() => {
                    // console.log("Hello fucker 1");
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
              }}>12 200</Text>
              <Right>
              <TouchableOpacity
                onPress={()=>{
                  // console.log("Hello fucker 2");
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
