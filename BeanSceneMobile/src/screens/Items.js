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
        var url = 'http://localhost:63437/API/Items';
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

    getItems = () => {
        var url = 'http://localhost:63437/API/Items';
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

    addItem = () => {
        console.log("add")
        // description causes errors for some reason
        /* #region */
        // var item = {
        //     id: this.state.id,
        //     name: this.state.name,
        //     description: this.state.description,
        //     dietary: this.state.dietary,
        //     price: this.state.price,
        //     category: this.state.category,
        //     thumbnail: this.state.thumbnail,
        //     availability: this.state.availability
        // }
        /* #endregion */
        //63437
        var url = "http://localhost:63437/API/Items/" + this.state.name + "/" + this.state.description + "/" + this.state.dietary + "/" + this.state.price + "/" + this.state.category + "/" + encodeURIComponent(this.state.thumbnail) + "/" + this.state.availability;


        var headers = new Headers({
            Authorization: "Basic " + btoa("test:test")
        }
        );
        /* #region */
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:63437');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // headers.append('Access-Control-Allow-Credentials', 'false');
        /* #endregion */

        var options = {
            method: "POST", headers: headers
            //, body:JSON.stringify(item) 
        };
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

    updateItem = () => {
        console.log("update")
        //description causes errors for some reason

        var item = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            dietary: this.state.dietary,
            price: this.state.price,
            category: this.state.category,
            thumbnail: this.state.thumbnail,
            availability: this.state.availability
        }
        var url = "http://localhost:63437/API/Items/" + this.state.id + "/" + this.state.name + "/" + this.state.description + "/" + this.state.dietary +"/" + this.state.price  + "/" + this.state.category + "/" + encodeURIComponent(this.state.thumbnail) + "/" + this.state.availability;

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
            method: "PUT", headers: headers,body:JSON.stringify(item)
            /* #region */
            //, body: {
            //     name: this.state.name,
            //     price: this.state.price,
            //     stock: this.state.stock,
            //     description: this.state.description,
            //     brand: this.state.brand,
            //     category: this.state.category,
            //     thumbnail: this.state.thumbnail
            // }
            /* #endregion */
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
                        name: item.name,
                        description: item.description,
                        dietary: item.dietary,
                        price: item.price,
                        category: item.category,
                        thumbnail: item.thumbnail,
                        availability: item.availability,
                        message: ''
                    })}>
                        <View style={{ margin: 5, flexDirection: "row", justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>{item.id}</Text>
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                            <Text style={{ color: 'white' }}>${item.price}</Text>
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
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Items List</Text>
                        <TouchableOpacity style={{}} onPress={() => {
                            
                            this.getItems();
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
                        <Text style={{ color: 'white' }}>Name</Text>
                        <Text style={{ color: 'white' }}>Price</Text>                     
                    </View>    
                    <ScrollView style={{ flex: 15 }}>
                        <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}>

                        </FlatList>
                    </ScrollView>
                </View>
            )
        }
        //ADD Item
        else if (this.state.selectedTab == "add") {
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Add Item</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Items</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getItems();

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
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Add Item</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 15 }}>{this.state.message}</Text>
                    </View>
                </View>
            )
        }
        //Item DETAILS
        else if (this.state.selectedTab == "detail") {
            return (
                <View style={styles.container}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Item Detail</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Items</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getItems();
                                this.setState({
                                    selectedTab: 'get'
                                })
                            }}>

                                <Ionicons style={{ color: '#FF7F50', fontSize: 50 }} name="arrow-back-outline"></Ionicons>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 15 }}>
                        <Input Text={" Id"} placeholder={"Item Id"} value={this.state.id} editable={false}></Input>
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
                            <TouchableOpacity style={{ backgroundColor: '#4BCA36', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.updateItem()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Update Item</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#e74c3c', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.deleteItem()}>
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


export default Items;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#404040',
        flex:1
    }
},
);