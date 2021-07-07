import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, View, Item, Input} from 'native-base';

export default class Login extends Component {
    state={
        email:"",
        password:""
    }
   
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
       return(
            <View style={styles.container}>

                <View style={styles.loginForm}>
                    <Text style={styles.logo}>My Wallet</Text>


                    <Item rounded style={styles.textField}>
                        <Input style={{color:"#fff"}} 
                            placeholderTextColor='#003f5c'
                            placeholder='E-mail'/>
                    </Item>


                    <Item rounded style={styles.textField}>
                        <Input style={{color:"#fff"}} 
                            placeholderTextColor='#003f5c'
                            placeholder='Password'/>
                    </Item>


                    <TouchableOpacity>
                        <Text style={{color:"#fff"}}>Forgot Password?</Text>
                    </TouchableOpacity>


                    <Button rounded light style={styles.btnLogin}
                    onPress={()=>{
                        this.props.navigation.replace('Dashboard')
                    }}
                    >
                        <Text style={{color:"#fff"}}>LOGIN</Text>
                    </Button>


                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('RegisterUser')
                    }}
                    >
                        <Text style={{color:"#fff"}}>Signup</Text>
                    </TouchableOpacity>

                    {/* <Button style={styles.btnSignup}
                    onPress={()=>{
                        this.props.navigation.navigate('RegisterUser')
                    }}
                    >
                        <Text style={{color:"#fff"}}>Signup</Text>
                    </Button> */}

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
