import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';


class Input extends Component {
    render() {
        return (
            <View style={{ }}>
                <Text style={{ color: 'white' }}>{this.props.Text}</Text>
                <TextInput placeholder={this.props.placeholder} value={this.props.value} style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40,  borderRadius: 5,  margin:10, padding: 5, }} editable={this.props.editable} onChangeText={this.props.onChangeText}></TextInput>
            </View>
        )
    }
}

export default Input;