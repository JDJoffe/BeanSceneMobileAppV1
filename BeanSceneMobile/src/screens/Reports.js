import React, { Component } from "react";
import {View,Text} from "react-native";

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