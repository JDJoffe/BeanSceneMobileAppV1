import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//import {screenDimensions} from "../layout/screenDimensions"
//const {ww, wh} = screenDimensions()

const { width, height } = Dimensions.get('window');
//const {width2}=Dimensions.get('window').width;
//const {height2}=Dimensions.get('window').height;
class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            username: '',
            password: '',
            validation: '',
            error: ''
        }
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e
        })
    }

    login = () => {
        if (this.state.username.length == 0) {
            this.setState({
                error: "Please enter username"
            })
        }
        else if (this.state.password.length == 0) {
            this.setState({
                error: "Please enter password"
            })
        }
        else {
            this.setState({
                error: ''
            })
            console.log("login")
            //description causes errors for some reason
            var url = "http://localhost:63437/API/Staff/" + this.state.username + '/' + this.state.password;

            var headers = new Headers({
                Authorization: "Basic " + btoa("test:test")
            }
            );
            var options = { headers: headers };



            fetch(url, options)
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    if (json == null) {
                        this.setState({
                            error: 'Invalid username and password'
                        })
                    }
                    else {
                        this.setState({
                            data: json
                        })
                        global.firstname = json.firstname;
                        global.lastname = json.lastname;

                        if (json.role == "manager") {
                            global.role = "manager";
                            this.props.navigation.navigate("ManagerDashboard")
                        }
                        else {
                            global.role = "staff";
                            this.props.navigation.navigate("StaffDashboard")
                        }
                    }

                })
            //
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../images/BeanSceneLogo2.png")}></Image>
                    <Text style={styles.logosubheader}>BeanScene</Text>
                    <Text style={styles.logotitle}>Inventory Software System</Text>
                </View>
                <View style={styles.formContainer}>

                    <TextInput style={styles.input} placeholder={'Username or Email'} value={this.state.username} onChangeText={this.onUsernameChange}></TextInput>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder={'Password'} value={this.state.password} onChangeText={this.onPasswordChange}></TextInput>

                    <TouchableOpacity style={styles.buttoncontainer} onPress={() => this.props.navigation.navigate("ManagerDashboard")} onPress={this.login}>
                        <Text style={styles.buttontext}>LOGIN</Text>
                    </TouchableOpacity>

                    <View>
                        <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>{this.state.error}</Text>
                    </View>

                </View>

            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404040',
        alignItems: 'center',
        justifyContent: 'center',
        //width:width,
    },
    logoContainer: {
        flex: 3,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 3,
        width: width,
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'
    },
    logosubheader: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logotitle: {
        color: '#FF7F50',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        width: wp('80%'),
        //width:width -90,
        fontSize: 20,
        height: '10%',
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 20
    },
    buttoncontainer: {
        width: wp('80%'),
        borderRadius: 5,
        backgroundColor: '#4EEA36',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttontext: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24,
        // width: width-90,  
        textAlign: 'center',
        fontFamily: 'arial',

    }
});