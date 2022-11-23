import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";



class Header extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#404040', color: 'white', padding: 5, justifyContent: 'space-between', flexDirection: 'row', }}>
                <Text style={{ color: 'white' }}>Welcome {global.firstname} {global.lastname}</Text>
                <Text style={{ color: 'white' }}>Role: {global.role}</Text>
                <TouchableOpacity style={{ borderWidth: 3, borderRadius: 2, borderColor: '#e74c3c', backgroundColor: '#e74c3c' }} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Header;