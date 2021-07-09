import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, View, Item, Input} from 'native-base';
import { Value } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.getLoggedUser().then(loggedUser=>{
            if(loggedUser != null) {
                this.props.navigation.replace('Dashboard');
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


    loginUser() {
        const loginData = {
            username: this.state.username,
            password: this.state.password,
        };

        fetch('http://192.168.1.100:3000/api/v1/userRoute/loginUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),

        }).then(response => response.json())
            .then(json => {
                if (json.message == 'registered user') {
                    // console.log(json.data.username + ' - ' + json.data.email);

                    this.storeData(json.data);
                    this.props.navigation.replace('Dashboard');

                } else if (json.message == 'Incorrect Password') {
                    alert('Incorrect password');
                } else if (json.message == 'Invalid username or not registered yet !') {
                    alert('Invalid username or not registered yet !');
                } else {
                    alert(json.message);
                }
            })
            .catch(error => {
                console.log(error);
                alert('Failed');
            });
    }

    //Save to async storage
    storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('loggedUser', jsonValue)
          console.log('Save data in async storage');
          //console.log(jsonValue);
        } catch (e) {
          alert('user not save in async storage !')
        }
    }




    render() {
       return(
            <View style={styles.container}>

                <View style={styles.loginForm}>
                    <Text style={styles.logo}>My Wallet</Text>


                    <Item rounded style={styles.textField}>
                        <Input style={{color:"#fff"}} 
                            placeholderTextColor='#003f5c'
                            placeholder='Username'
                            value={this.state.username}
                            onChangeText={value => {
                                this.setState({
                                    username: value,
                                });
                                // console.log(username);
                            }}
                            />
                    </Item>


                    <Item rounded style={styles.textField}>
                        <Input style={{color:"#fff"}} 
                            placeholderTextColor='#003f5c'
                            placeholder='Password'  
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={value => {
                                this.setState({
                                    password: value,
                                });
                                // console.log(password);
                            }}
                            />
                    </Item>


                    <TouchableOpacity>
                        <Text style={{color:"#fff"}}>Forgot Password?</Text>
                    </TouchableOpacity>


                    <Button rounded light style={styles.btnLogin}
                    onPress={()=>{
                        // console.log("---------------------------");
                        // console.log(this.state.username+' - '+this.state.password);
                        this.loginUser();
                    }}
                    >
                        <Text style={{color:"#fff"}}>LOGIN</Text>
                    </Button>


                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.replace('RegisterUser')
                    }}
                    >
                        <Text style={{color:"#fff"}}>Signup</Text>
                    </TouchableOpacity>

                </View>

            </View>
       );
   }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#003f5c'
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    },
    loginForm:{
        width:"80%",
        height:50,
        marginTop:70,
        marginBottom:70,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField:{
        backgroundColor:"#465881",
        color: "#fff",
        height: 40,
        width: "100%",
        marginBottom: 25,
        borderColor: "#465881"
    },
    btnLogin:{
        width:"100%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginTop:25,
        marginBottom:25
    },
    forgot:{
        color:"white",
        fontSize:11
    }
    // btnSignup:{
    //     backgroundColor:"#003f5c",
    //     elevation: 0,
    //     width:"100%",
    //     alignItems:"center",
    //     justifyContent:"center",
    // }
    

 
});
