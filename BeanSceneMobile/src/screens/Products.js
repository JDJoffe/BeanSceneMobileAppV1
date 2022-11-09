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
class Products extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            selectedTab: 'get',
            id: '',
            name: '',
            price: '',
            stock: '',
            description: '',
            thumbnail: '',
            message: '',
            category: ''
        }
    }

    componentDidMount() {
        var url = 'http://localhost:63437/API/Products';
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

    getProducts = () => {
        var url = 'http://localhost:63437/API/Products';
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

    deleteProduct = () => {
        console.log("delete")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Products/" + this.state.id;

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

    addProduct = () => {
        console.log("add")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Products/" + this.state.name + "/" + this.state.price + "/" + this.state.stock + "/" + this.state.description + "/" + this.state.brand + "/" + this.state.category + "/" + encodeURIComponent(this.state.thumbnail);


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

    updateProduct = () => {
        console.log("update")
        //description causes errors for some reason
        var url = "http://localhost:63437/API/Products/" + this.state.id;//+ "/" + this.state.name + "/" + this.state.price + "/" + this.state.stock + "/" + this.state.description + "/" + this.state.brand + "/" + this.state.category + "/" + this.state.thumbnail+"/";

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

    render() {
        if (this.state.selectedTab == "get") {
            const renderData = ({ item }) => {
                return (
                    <TouchableOpacity onPress={() => this.setState({
                        selectedTab: 'detail',
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        stock: item.stock,
                        price: item.price,
                        brand: item.brand,
                        category: item.category,
                        thumbnail: item.thumbnail,
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
                <View style={{ backgroundColor: "grey", flex: 1 }}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center'
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Products List</Text>
                        <TouchableOpacity style={{}} onPress={() => {
                            this.getProducts();
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
                            <Ionicons style={{ color: '#e74c3c', fontSize: 50 }} name="add-circle-outline"></Ionicons>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ flex: 15 }}>
                        <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}>

                        </FlatList>
                    </ScrollView>
                </View>
            )
        }
        //ADD PRODUCT
        else if (this.state.selectedTab == "add") {
            return (
                <View style={{ backgroundColor: "grey", flex: 1 }}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Add Product</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Products</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getProducts();

                                this.setState({
                                    selectedTab: 'get'

                                })
                            }}>

                                <Ionicons style={{ color: '#e74c3c', fontSize: 50 }} name="arrow-back-outline"></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 15 }}>
                        <Input Text={" Name"} placeholder={"Product Name"} value={this.state.name} onChangeText={text => this.setState({ name: text })} ></Input>
                        <Input Text={" Price"} placeholder={"Product Price"} value={this.state.price} onChangeText={text => this.setState({ price: text })}></Input>
                        <Input Text={" Stock"} placeholder={"Product Stock"} value={this.state.stock} onChangeText={text => this.setState({ stock: text })}></Input>
                        <Input Text={" Description"} placeholder={"Product Description"} value={this.state.description} onChangeText={text => this.setState({ description: text })}></Input>
                        <Input Text={" Brand"} placeholder={"Product Brand"} value={this.state.brand} onChangeText={text => this.setState({ brand: text })}></Input>
                        {/* <Input Text={" Category"} placeholder={"Product Category"} value={this.state.category} onChangeText={text => this.setState({ category: text })}></Input> */}
                        <Input Text={" Thumbnail Url"} placeholder={"Product Thumbnail"} value={this.state.thumbnail} onChangeText={text => this.setState({ thumbnail: text })}></Input>
                        <Text style={{ color: 'white', marginLeft: wp('-75%') }}>Category</Text>
                        <Picker style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 5, }} selectedValue={this.state.category} onValueChange={(value) => this.setState({ category: value })}>
                            <Picker.Item label="Select Category" value="Categories"></Picker.Item>
                            <Picker.Item label="Samsung" value="Samsung"></Picker.Item>
                            <Picker.Item label="Iphones" value="Iphones"></Picker.Item>
                            <Picker.Item label="Oppo" value="Oppo"></Picker.Item>
                        </Picker>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#e74c3c', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.addProduct()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Add Product</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 15 }}>{this.state.message}</Text>
                    </View>
                </View>
            )
        }
        //PRODUCT DETAILS
        else if (this.state.selectedTab == "detail") {
            return (
                <View style={{ backgroundColor: "grey", flex: 1 }}>
                    <Header navigation={navigation}></Header>
                    <View style={{
                        flex: 1, backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center', marginBottom: 10
                    }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', flex: 1 }}>Product Detail</Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', flex: 1 }}>Back to Products</Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                this.getProducts();
                                this.setState({
                                    selectedTab: 'get'
                                })
                            }}>

                                <Ionicons style={{ color: '#e74c3c', fontSize: 50 }} name="arrow-back-outline"></Ionicons>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 15 }}>
                        <Input Text={" Id"} placeholder={"Product Id"} value={this.state.id} editable={false}></Input>
                        <Input Text={" Name"} placeholder={"Product Name"} value={this.state.name} onChangeText={text => this.setState({ name: text })} ></Input>
                        <Input Text={" Price"} placeholder={"Product Price"} value={this.state.price} onChangeText={text => this.setState({ price: text })}></Input>
                        <Input Text={" Stock"} placeholder={"Product Stock"} value={this.state.stock} onChangeText={text => this.setState({ stock: text })}></Input>
                        <Input Text={" Description"} placeholder={"Product Description"} value={this.state.description} onChangeText={text => this.setState({ description: text })}></Input>
                        <Input Text={" Brand"} placeholder={"Product Brand"} value={this.state.brand} onChangeText={text => this.setState({ brand: text })}></Input>
                        {/* <Input Text={" Category"} placeholder={"Product Category"} value={this.state.category} onChangeText={text => this.setState({ category: text })}></Input> */}
                        <Text style={{ color: 'white', marginLeft: wp('-75%') }}>Category</Text>
                        <Picker style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 5, }} selectedValue={this.state.category} onValueChange={(value) => this.setState({ category: value })}>
                            <Picker.Item label="Select Category" value="Categories"></Picker.Item>
                            <Picker.Item label="Samsung" value="Samsung"></Picker.Item>
                            <Picker.Item label="Iphones" value="Iphones"></Picker.Item>
                            <Picker.Item label="Oppo" value="Oppo"></Picker.Item>
                        </Picker>
                        <Input Text={" Thumbnail Url"} placeholder={"Product Thumbnail"} value={this.state.thumbnail} onChangeText={text => this.setState({ thumbnail: text })}></Input>

                        {/* <Image style={{width:200, height:200}} source={{uri:this.state.thumbnail}}/> */}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ backgroundColor: '#e74c3c', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.updateProduct()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Update Product</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#e74c3c', height: 50, borderRadius: 5, width: wp("30%"), alignItems: 'center', justifyContent: 'center', margin: 15 }} onPress={() => this.deleteProduct()}>
                                <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} >Delete Product</Text>
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


export default Products;

const styles = StyleSheet.create({

},
);