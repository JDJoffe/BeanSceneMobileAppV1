import React, { Component } from "react";
import {View,Text, StyleSheet} from "react-native";

import Header from '../layout/Header'

class Reports extends Component{
    render(){
        return(
            <View>
                 <Header navigation ={navigation}></Header>
                <Text>Reports Screen</Text>
            </View>
        )
    }
}

export default Reports;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#404040',
        flex:1
    }
},
);