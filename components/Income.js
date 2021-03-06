import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Text, Card, Item, Input, Label, SwipeRow, Icon, List, ListItem, Thumbnail } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

let loggedUserId;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incomeDate: '',
            incomeType: '',
            incomeAmount: '',
        };
        
        //Get user id
        this.getLoggedUser().then(loggedUser=>{
            if(loggedUser != null) {
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

    //ADD NEW INCOME
    addIncome() {
        const incomeData = {
            incomeDate:this.state.incomeDate,
            incomeType:this.state.incomeType,
            incomeAmount:this.state.incomeAmount,
            userId:loggedUserId,
        };

        fetch('http://192.168.1.102:3000/api/v1/incomeRoute/addIncome', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incomeData),
        }).then(response => response.json())
            .then(json => {
                //console.log(json);
                if (json.message == 'success') {
                    alert('Income added ! ');
                   
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
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#fb5b5a'
                        }}>ADD INCOME</Text>



                        <Item floatingLabel
                            style={{
                                margin: 15
                            }}
                        >
                            <Label style={{
                                color: '#fff',
                                fontSize: 15
                            }}>Date</Label>
                            <Input style={{
                                color: '#fff'
                            }}
                                onChangeText={(value) => {
                                    this.setState({
                                        incomeDate: value,
                                    });
                                }}
                            />
                        </Item>

                        <Item floatingLabel
                            style={{
                                margin: 15
                            }}
                        >
                            <Label style={{
                                color: '#fff',
                                fontSize: 15
                            }}>Type of Income</Label>

                            <Input style={{
                                color: '#fff'
                            }}
                                onChangeText={(value) => {
                                    this.setState({
                                        incomeType: value,
                                    });
                                }}
                            />
                        </Item>

                        <Item floatingLabel
                            style={{
                                margin: 15
                            }}
                        >
                            <Label style={{
                                color: '#fff',
                                fontSize: 15
                            }}>Amount</Label>
                            <Input 
                            keyboardType="numeric"
                            style={{
                                color: '#fff'
                            }}
                                onChangeText={(value) => {
                                    this.setState({
                                        incomeAmount: value,
                                    });
                                }}
                            />
                        </Item>




                        <Button rounded light style={{
                            backgroundColor: '#fb5b5a',
                            width: '60%',
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginLeft: 50
                        }}
                            onPress={() => {
                                // console.log("---------------------------");
                                // console.log(this.state.incomeDate + ' - ' + this.state.incomeType + ' - ' + this.state.incomeAmount);
                                // console.log(loggedUserId);
                                this.addIncome();
                            }}
                        >
                            <Text style={{
                                color: "#fff",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>Add</Text>
                        </Button>

                        <Button rounded light style={{
                            backgroundColor: '#fb5b5a',
                            width: '60%',
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                            marginLeft: 50
                        }}
                            onPress={() => {
                                this.props.navigation.navigate('Dashboard');
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Cancel</Text>
                        </Button>


                    </Card>

                    <View style={styles.incomeListContainer}>

                        <SwipeRow
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            left={
                                <Button success onPress={() => alert('Add')}>
                                    <Text>Edit</Text>
                                </Button>
                            }
                            body={
                                <View>
                                    <Text>SwipeRow Body Text</Text>
                                </View>
                            }
                            right={
                                <Button danger onPress={() => alert('Trash')}>
                                    <Icon active name="trash" />
                                </Button>
                            }
                        />

                        <SwipeRow
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            left={
                                <Button success onPress={() => alert('Add')}>
                                    <Text>Edit</Text>
                                </Button>
                            }
                            body={
                                <View>
                                    <Text>SwipeRow Body Text</Text>
                                </View>
                            }
                            right={
                                <Button danger onPress={() => alert('Trash')}>
                                    <Icon active name="trash" />
                                </Button>
                            }
                        />

                    </View>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: '#003f5c',
        height: 40,
        width: "100%"
    },
    card: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 15,
        padding: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#003f5c'
    },
    incomeListContainer:{
        marginTop:20,
        marginBottom:50,
    }

})
