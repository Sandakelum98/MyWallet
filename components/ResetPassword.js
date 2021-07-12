import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, View, Item, Input, Toast} from 'native-base';

export default class RegisterUser extends Component {

    state={
        email:'',
    }

    resetPassword() {
        const userData = {
            email:this.state.email,
        };

        fetch('http://192.168.1.102:3000/api/v1/userRoute/resetPassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(response => response.json())
            .then(json => {
                //console.log(json);
                if (json.message == 'success') {
                    alert('Your password reset. Check your email for new password');
                
                    this.props.navigation.replace('Login');

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
        return(
            <View style={styles.container}>

                <View style={styles.loginForm}>

                    <Text style={styles.logo}>My Wallet</Text>
                    <Text style={styles.subTitle}>Reset Password</Text>


                    <Item rounded style={styles.textField}>
                        <Input style={{color:"#fff"}} 
                            placeholderTextColor='#003f5c'
                            placeholder='E-mail'
                            onChangeText={(value) => {
                                this.setState({
                                    email: value,
                                });
                            }}
                            />
                    </Item>



                    <Button rounded light style={styles.btn}
                    onPress={()=>{
                        // console.log("---------------------------");
                        // console.log(this.state.username+' - '+this.state.email+' - '+this.state.password);

                        this.resetPassword();
                    }}
                    >
                        <Text style={{color:"#fff"}}>RESET</Text>
                    </Button>
                    
                    
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.replace('Login');
                    }}
                    >
                        <Text style={{color:"#fff"}}>Back to Login</Text>
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
        marginBottom:10
    },
    subTitle:{
        fontSize: 25,
        color:"#fff",
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
    btn:{
        width:"100%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:25
    }
 
});