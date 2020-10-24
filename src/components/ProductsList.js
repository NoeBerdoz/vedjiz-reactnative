import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TouchableHighlight} from 'react-native';
import { ProductContainer } from '../services';
import {Avatar, ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import TouchableScale from 'react-native-touchable-scale';

export default function ProductsList() {

    const navigation = useNavigation();

    const productContainer = ProductContainer.useContainer();

    const[isLoading, setIsLoading] = useState(false);

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
    };
/*
    // Example console.log
    if(productContainer.products){
        productContainer.products.forEach(product => console.log(product.pictureUrl))
    }
*/
    const renderItem = ({item}) => (
        <ListItem
            onPress={() => console.log("fewgw")}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            bottomDivider
        >
            <Avatar source={{uri: item.pictureUrl}} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.price} CHF/kg, {item.stock} en stock</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )

    return (
        <SafeAreaView>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={productContainer.products}
                renderItem={renderItem}
                refreshing={isLoading}
            />
        </SafeAreaView>
    )

}
