import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, View, Item, Input} from 'native-base';

export default class RegisterUser extends Component {
    render() {
        return(
            <View style={styles.container}>

                <View style={styles.loginForm}>

                    <Text style={styles.logo}>My Wallet</Text>
                    <Text style={styles.subTitle}>Sign Up</Text>



                    <Item rounded style={styles.textField}>
                        <Input style={{color:"#fff"}} 
                            placeholderTextColor='#003f5c'
                            placeholder='Username'/>
                    </Item>


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


                    <Button rounded light style={styles.btn}
                    onPress={()=>{
                        this.props.navigation.navigate('Dashboard')
                    }}
                    >
                        <Text style={{color:"#fff"}}>SIGNUP</Text>
                    </Button>
                    

                    <Button rounded light style={styles.btn}>
                        <Text style={{color:"#fff"}}>Cancel</Text>
                    </Button>


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