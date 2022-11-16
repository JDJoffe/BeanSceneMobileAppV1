import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, FlatList, Picker } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';

import Header from '../layout/Header';
import Input from '../layout/Input';
import { render } from "react-dom";
import { TextInput } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";


const { width, height } = Dimensions.get('window');
class Items extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            selectedTab: 'get',
            id: '',
            name: '',
            description: '',
            dietary: '',
            price: '',
            category: '',
            thumbnail: '',
            availability: '',
            message: '',

        }
    }

    componentDidMount() {
        var url = 'http://localhost:63437/API/Orders';
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

    getOrders = () => {
        var url = 'http://localhost:63437/API/Orders';
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
                    message: ''
                })
            })
    }

    deleteItem = () => {
        console.log("delete")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Items/" + this.state.id;

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

    addOrder = () => {
        console.log("add")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Orders/" + this.state.name + "/" + this.state.price + "/" + this.state.stock + "/" + this.state.description + "/" + this.state.brand + "/" + this.state.category + "/" + encodeURIComponent(this.state.thumbnail);


        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:19006');
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

    updateOrder = () => {
        console.log("update")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Orders/" + this.state.id;//+ "/" + this.state.name + "/" + this.state.price + "/" + this.state.stock + "/" + this.state.description + "/" + this.state.brand + "/" + this.state.category + "/" + this.state.thumbnail+"/";

        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:19006');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // headers.append('Access-Control-Allow-Credentials', 'false');

        // all other stuff in body
        var options = {
            method: "PUT", headers: headers//, body: {
            //     name: this.state.name,
            //     price: this.state.price,
            //     stock: this.state.stock,
            //     description: this.state.description,
            //     brand: this.state.brand,
            //     category: this.state.category,
            //     thumbnail: this.state.thumbnail


            // }
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
}