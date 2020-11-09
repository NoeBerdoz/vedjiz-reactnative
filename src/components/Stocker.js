import React, {useEffect, useState} from "react";
import {FlatList, TextInput, View, StyleSheet} from 'react-native';
import {Avatar, Button, Image, ListItem, Text} from "react-native-elements";
import {ProductContainer, StockerContainer} from '../services';


export default function Stocker() {

    const productContainer = ProductContainer.useContainer();
    const stockerContainer = StockerContainer.useContainer();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async() => {
        try {
            setIsLoading(true);
            await productContainer.getProducts()
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }



    console.log("new stock:")

    const renderItemStocker = ({item}) => (
        <View style={styles.viewStocker}>
            <Image source={{uri: item.pictureUrl}}
                   style={{ width: 200, height: 200 }}
            />
            <Text>{item.name}</Text>
            <TextInput
                style={styles.inputStocker}
                keyboardType="numeric"
                onChangeText={value => {
                    if (!isNaN(Number(value)))
                        stockerContainer.addToStocker(item, Number(value))
                }}
            >{item.stock}</TextInput>
            <Button
                title="Valider le stock"
                onPress={value => {
                        stockerContainer.addToStocker(item, value)
                        console.log("OK")
                        console.log(stockerContainer.addToStocker(item, value))
                }}
            />
        </View>
    )

    return (
        <View>
            <Text h1>Validation du stock</Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={productContainer.products}
                renderItem={renderItemStocker}
                refreshing={isLoading}
                onRefresh={loadProducts}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    viewStocker: {
        alignItems: "center",
    },
    inputStocker: {
        backgroundColor: "white",
        margin: 5
    }
})
