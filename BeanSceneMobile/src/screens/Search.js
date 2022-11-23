import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, FlatList, StyleSheet } from "react-native";
import { Value } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import Header from '../layout/Header'

class Search extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    // componentDidMount() {
    //     fetch('http://localhost:63437/API/Products/Search/' + SearchInput).
    //         then(response => response.json()).
    //         then((json) => {
    //             console.log(json);

    //             this.setState({
    //                 data: json
    //             })
    //         })
    // }

    search = (text) => {
        var url = 'http://localhost:63437/API/Products/Search/' + text;
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



    render() {

        const renderData = ({ item }) => {
            return (
                <View style={{ margin: 5, flexDirection: "row", justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>{item.id}</Text>
                    <Text style={{ color: 'white' }}>{item.name}</Text>
                    <Text style={{ color: 'white' }}>{item.price}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Header navigation={navigation}></Header>
                <View style={{ alignItems: 'center', flex: 1, paddingBottom: 15 }}>
                    <TextInput placeholder={'Search Product'} onChangeText={(text) => this.search(text)} style={{ backgroundColor: 'white', width: wp('80%'), fontSize: 20, height: 40, borderRadius: 5, margin: 10, padding: 15 }}></TextInput>
                </View>

                {/* {
                        this.state.data.map((item, index) => (
                            <View style={{ margin: 5, flexDirection: "row", justifyContent: 'space-between', padding: 5, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>{item.id}: {item.name} {item.price}</Text>
                            </View>
                        ))
                    } */}
                <ScrollView style={{ flex: 14 }}>
                    <FlatList data={this.state.data} renderItem={renderData} keyExtractor={(item) => item.id}>

                    </FlatList>
                </ScrollView>


            </View>
        )
    }
}

export default Search;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#404040',
        flex:1
    }
},
);