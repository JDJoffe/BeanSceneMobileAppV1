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
class Orders extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            selectedTab: 'get',
            id: '',
            Table: '',
            Items: '',
            Dietary: '',
            Requests: '',
            Date: '',
            Time: '',
            Status: '',
            Notes: '',
            Message: '',
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

    deleteOrder = () => {
        console.log("delete")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Orders/" + this.state.id;

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
        var url = "http://localhost:63437/API/Orders/" + this.state.Table + "/" + this.state.Items + "/" + this.state.Dietary + "/" + this.state.Requests + "/" + this.state.Date + "/" + this.state.Time + "/" + this.state.Status + "/" + this.state.Notes;


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

    updateOrder = () => {
        console.log("update")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Orders/" + this.state.id;//+ "/" + this.state.name + "/" + this.state.price + "/" + this.state.stock + "/" + this.state.description + "/" + this.state.brand + "/" + this.state.category + "/" + this.state.thumbnail+"/";

        var order = {
            id: this.state.id,
            Table: this.state.Table,
            Items: this.state.Items,
            Dietary: this.state.Dietary,
            Requests: this.state.Requests,
            Date: this.state.Date,
            Time: this.state.Time,
            Status: this.state.Status,
            Notes: this.state.Notes
        }
        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:63437');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // headers.append('Access-Control-Allow-Credentials', 'false');

        // all other stuff in body
        var options = {
            method: "PUT", headers: headers, body: JSON.stringify(order)//, body: {
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
    render() {
        if (this.state.selectedTab == "get") {
            const renderData = ({ item }) => {
                return (
                    <TouchableOpacity onPress={() => this.setState({
                        selectedTab: 'detail',
                        id: item.id,
                        Table: item.Table,
                        Items: item.Items,
                        Dietary: item.Dietary,
                        Requests: item.Requests,
                        Date: item.Date,
                        Time: item.Time,
                        Status: item.Status,
                        Notes: item.Notes,
                        message: ''
                    })}>


                        <View style={{ flexDirection: "row", margin: 2.5, justifyContent: 'space-between', padding: 2.5, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>{item.id}</Text>
                            <Text style={{ color: 'white' }}>{item.Table}</Text>
                            <Text style={{ color: 'white' }}>{item.Date}</Text>
                            <Text style={{ color: 'white' }}>{item.Time}</Text>
                        </View>


                        {/* <View style={{ flexDirection: "row", margin: 5, justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>{item.id}</Text>
                                <Text style={{ color: 'white' }}>{item.Table}</Text>
                                <Text style={{ color: 'white' }}>{item.Date}</Text>
                                <Text style={{ color: 'white' }}>{item.Time}</Text>
                            </View> */}

                    </TouchableOpacity>

                )
            };
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center'
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Items List</Text>
                        <TouchableOpacity style={{}} onPress={() => {
                            this.getOrders();
                            this.setState({
                                selectedTab: 'add',
                                // id: '',
                                // name: '',
                                // price: '',
                                // stock: '',
                                // description: '',
                                // thumbnail: ''
                            })
                        }}>
                            <Ionicons style={{ color: '#FF7F50', fontSize: 50 }} name="add-circle-outline"></Ionicons>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: "row", margin: 2.5, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'white', paddingHorizontal: 2.5 }}>
                        <Text style={{ color: 'white' }}>Id</Text>
                        <Text style={{ color: 'white' }}>Table</Text>
                        <Text style={{ color: 'white' }}>Date</Text>
                        <Text style={{ color: 'white' }}>Time</Text>
                    </View>
                    <ScrollView style={{ flex: 15 }}>
                        <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}>

                        </FlatList>
                    </ScrollView>
                </View>
            )
        }
        //ADD Order
        else if (this.state.selectedTab == "add") {
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Add Order</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Orders</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getOrders();

                                this.setState({
                                    selectedTab: 'get'

                                })
                            }}>

                                <Ionicons style={{ color: '#FF7F50', fontSize: 50 }} name="arrow-back-outline"></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 15 }}>
                        <Input Text={" Name"} placeholder={"Item Name"} value={this.state.name} onChangeText={text => this.setState({ name: text })} ></Input>
                        <Input Text={" Description"} placeholder={"Item Description"} value={this.state.description} onChangeText={text => this.setState({ description: text })}></Input>
                        <Input Text={" Dietary"} placeholder={"Item Dietary"} value={this.state.dietary} onChangeText={text => this.setState({ dietary: text })}></Input>
                        <Input Text={" Price"} placeholder={"Item Price"} value={this.state.price} onChangeText={text => this.setState({ price: text })}></Input>
                        <Text style={{ color: 'white', marginLeft: wp('-75%') }}>Category</Text>
                        <Picker style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 5, }} selectedValue={this.state.category} onValueChange={(value) => this.setState({ category: value })}>
                            <Picker.Item label="Select Category" value="Categories"></Picker.Item>
                            <Picker.Item label="Main" value="main"></Picker.Item>
                            <Picker.Item label="entrée" value="entrée"></Picker.Item>
                            <Picker.Item label="Dessert" value="dessert"></Picker.Item>
                            <Picker.Item label="Drink" value="drink"></Picker.Item>
                            <Picker.Item label="Side" value="side"></Picker.Item>
                            <Picker.Item label="Special" value="special"></Picker.Item>
                        </Picker>
                        {/* <Input Text={" Category"} placeholder={"Item Category"} value={this.state.category} onChangeText={text => this.setState({ category: text })}></Input> */}
                        <Input Text={" Thumbnail Url"} placeholder={"Item Thumbnail"} value={this.state.thumbnail} onChangeText={text => this.setState({ thumbnail: text })}></Input>
                        <Text style={{ color: 'white', marginLeft: wp('-75%') }}>Availability</Text>
                        <Picker style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 5, }} selectedValue={this.state.availability} onValueChange={(value) => this.setState({ availability: value })}>
                            <Picker.Item label="Available" value="available"></Picker.Item>
                            <Picker.Item label="Unavailable" value="unavailable"></Picker.Item>
                        </Picker>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#FF7F50', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.addItem()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Add Order</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 15 }}>{this.state.message}</Text>
                    </View>
                </View>
            )
        }
        //Order DETAILS
        else if (this.state.selectedTab == "detail") {
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Order Detail</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Orders</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getOrders();
                                this.setState({
                                    selectedTab: 'get'
                                })
                            }}>

                                <Ionicons style={{ color: '#FF7F50', fontSize: 50 }} name="arrow-back-outline"></Ionicons>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 15 }}>
                        <Input Text={" Id"} placeholder={"Order Id"} value={this.state.id} editable={false}></Input>
                        <Picker style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 5, }} selectedValue={this.state.Table} onValueChange={(value) => this.setState({ Table: value })}>
                            <Picker.Item label="Select Table" value="Table"></Picker.Item>
                            <Picker.Item label="M1" value="1"></Picker.Item>
                            <Picker.Item label="M2" value="2"></Picker.Item>
                            <Picker.Item label="M3" value="3"></Picker.Item>
                            <Picker.Item label="M4" value="4"></Picker.Item>
                            <Picker.Item label="M5" value="5"></Picker.Item>
                            <Picker.Item label="M6" value="6"></Picker.Item>
                            <Picker.Item label="M7" value="7"></Picker.Item>
                            <Picker.Item label="M8" value="8"></Picker.Item>
                            <Picker.Item label="M9" value="9"></Picker.Item>
                            <Picker.Item label="M10" value="10"></Picker.Item>
                            <Picker.Item label="O1" value="11"></Picker.Item>
                            <Picker.Item label="O2" value="12"></Picker.Item>
                            <Picker.Item label="O3" value="13"></Picker.Item>
                            <Picker.Item label="O4" value="14"></Picker.Item>
                            <Picker.Item label="O5" value="15"></Picker.Item>
                            <Picker.Item label="O6" value="16"></Picker.Item>
                            <Picker.Item label="O7" value="17"></Picker.Item>
                            <Picker.Item label="O8" value="18"></Picker.Item>
                            <Picker.Item label="O9" value="19"></Picker.Item>
                            <Picker.Item label="O10" value="20"></Picker.Item>
                            <Picker.Item label="B1" value="21"></Picker.Item>
                            <Picker.Item label="B2" value="22"></Picker.Item>
                            <Picker.Item label="B3" value="23"></Picker.Item>
                            <Picker.Item label="B4" value="24"></Picker.Item>
                            <Picker.Item label="B5" value="25"></Picker.Item>
                            <Picker.Item label="B6" value="26"></Picker.Item>
                            <Picker.Item label="B7" value="27"></Picker.Item>
                            <Picker.Item label="B8" value="28"></Picker.Item>
                            <Picker.Item label="B9" value="29"></Picker.Item>
                            <Picker.Item label="B10" value="30"></Picker.Item>
                        </Picker>
                        <Input Text={" Items"} placeholder={"Items"} value={this.state.Items} onChangeText={text => this.setState({ Items: text })}></Input>
                        <Input Text={" Dietary"} placeholder={"Dietary"} value={this.state.Dietary} onChangeText={text => this.setState({ Dietary: text })}></Input>
                        <Input Text={" Requests"} placeholder={"requests"} value={this.state.Requests} onChangeText={text => this.setState({ Requests: text })}></Input>
                        <Input Text={" Date"} placeholder={"Date"} value={this.state.Date} onChangeText={text => this.setState({ Date: text })}></Input>
                        <Text style={{ color: 'white', marginLeft: wp('-75%') }}>Status</Text>
                        <Picker style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 5, }} selectedValue={this.state.availability} onValueChange={(value) => this.setState({ availability: value })}>
                            <Picker.Item label="Preparing" value="preparing"></Picker.Item>
                            <Picker.Item label="Completed" value="completed"></Picker.Item>
                        </Picker>
                        <Input Text={" Notes"} placeholder={"Notes"} value={this.state.Notes} onChangeText={text => this.setState({ Notes: text })}></Input>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#4EEA36', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.updateOrder()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Update Item</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#e74c3c', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.deleteOrder()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Delete Item</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 15 }}>{this.state.message}</Text>
                    </View>

                </View>

            )
        }
    }
}

export default Orders;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#404040',
        flex: 1
    }
},
);