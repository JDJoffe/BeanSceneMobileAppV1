import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, FlatList } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';

import Header from '../layout/Header';
import Input from '../layout/Input';
import { render } from "react-dom";
import { TextInput } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');
class StaffDashboard extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            selectedTab: 'get',
            id: '',
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            role: '',
            message:''
        }
    }

    componentDidMount() {
        var url = 'http://localhost:63437/API/Staff';
        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        var options = { headers: headers };



        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json
                })
            })
    }

    getStaff = () => {
        var url = 'http://localhost:63437/API/Staff';
        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );


        var options = { headers: headers };

        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    messgae: ''
                })
            })
    }

    deleteStaff = () => {
        console.log("delete")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Staff/" + this.state.id;

        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        var options = { method: 'DELETE', headers: headers };
        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json,
                    message: "Deleted Successfully"
                })
            })
    }

    addStaff = () => {
        console.log("add")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Staff/" + this.state.firstname + "/" + this.state.lastname + "/" + this.state.username + "/" + this.state.password + "/" + this.state.email + "/" + this.state.role;


        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:63437');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // headers.append('Access-Control-Allow-Credentials', 'false');

        var options = { method: "POST", headers: headers };



        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json,
                    message: "Added Successfully"
                })
            })
    }

    updateStaff = () => {
        console.log("update")

        var staff = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            role: this.state.role
        }
        var url = "http://localhost:63437/API/Staff/" + this.state.id + "/" + this.state.firstname + "/" + this.state.lastname + "/" + this.state.username + "/" + this.state.password + "/" + this.state.email + "/" + this.state.role;

        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:63437');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // headers.append('Access-Control-Allow-Credentials', 'false');

        //var options = { method: "PUT", headers: headers };

        var options = {
            method: "PUT", headers: headers, body: JSON.stringify(staff)
        };

        fetch(url, options)
            .then(response => response.json())
            .then((json) => {
                console.log(json);

                this.setState({
                    data: json,
                    message: "Updated Successfully"
                })
            })
    }

    render() {
        if (this.state.selectedTab == 'get') {
            const renderData = ({ item }) => {
                return (

                    <TouchableOpacity onPress={() => this.setState({
                        selectedTab: 'detail',
                        id: item.id,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        username: item.username,
                        password: item.password,
                        email: item.email,
                        role: item.role,
                        message: ''
                    })}>
                        <View style={{ margin: 5, flexDirection: "row", justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>{item.id}</Text>

                            <Text style={{ color: 'white' }}>firstname: {item.firstname}</Text>

                            <Text style={{ color: 'white' }}>lastname: {item.lastname}</Text>
                            {/* <Text style={{ color: 'white' }}>Role: {item.role}  </Text> */}
                        </View>
                    </TouchableOpacity>
                )
            };
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center'
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Staff List</Text>
                        {/* <TouchableOpacity style={{}} onPress={() => {
                            this.getStaff();
                            this.setState({
                                selectedTab: 'add'
                            })
                        }}>
                            <Ionicons style={{ color: '#FF7F50', fontSize: 50 }} name="add-circle-outline"></Ionicons>
                        </TouchableOpacity> */}

                    </View>
                    <ScrollView style={{ flex: 15 }}>
                        <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}>

                        </FlatList>
                    </ScrollView>
                </View>
            )
        }
        //Details
        else if (this.state.selectedTab == "detail") {
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Staff Detail</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Staff</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getStaff();
                                this.setState({
                                    selectedTab: 'get'
                                })
                            }}>

                                <Ionicons style={{ color: '#FF7F50', fontSize: 50 }} name="arrow-back-outline"></Ionicons>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 15 }}>


                        <Input Text={" FirstName"} placeholder={" FirstName"} value={this.state.firstname} editable={false}></Input>
                        <Input Text={" LastName"} placeholder={" LastName"} value={this.state.lastname} editable={false}></Input>
                        <Input Text={" Email"} placeholder={" Email"} value={this.state.
                            email} onChangeText={text => this.setState({ email: text })} editable={false}></Input>
                        <Input Text={" Role"} placeholder={" Role"} value={this.state.
                            role} onChangeText={text => this.setState({ role: text })} editable={false}></Input>


                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#4BCA36', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.updateStaff()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Update Staff</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#e74c3c', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.deleteStaff()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Delete Staff</Text>
                            </TouchableOpacity>
                        </View> */}
                    </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 15 }}>{this.state.message}</Text>
                    </View>

                </View>

            )
        }
    }
}

export default StaffDashboard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#404040',
        flex: 1
    }
},
);