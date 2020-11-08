import { Picker } from '@react-native-community/picker';
import React, {useMemo, useState} from 'react';
import {BasketContainer, ProductContainer, UserContainer} from '../services';
import {FlatList, SafeAreaView, View} from 'react-native';
import {Avatar, Button, ListItem, Text} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {TextInput} from 'react-native-gesture-handler';

export default function Basket() {

    const [selectedProduct, setSelectedProduct] = useState();
    const productContainer = ProductContainer.useContainer();
    const basketContainer = BasketContainer.useContainer();

    const basketPrice = useMemo(() => {
        let price = 0; // initialize price

        basketContainer.basket.forEach(function (quantity, productId) {

            let product = productContainer.getProduct(productId);

            if (product) {
                price += product.price * quantity;
            }
        });

        return Math.round(price * 100) / 100; // Returns a supplied numeric expression rounded to the nearest integer.

    }, [basketContainer.basket])

    const productsFromBasketWithQuantity = []

    basketContainer.basket.forEach((quantity, productId) => {
        const product = productContainer.getProduct(productId)

        productsFromBasketWithQuantity.push({
            ...product,
            quantity
        })
    })

    console.log(productsFromBasketWithQuantity)

    const renderItem = ({item}) => (
        <ListItem
            onPress={() => basketContainer.removeFromBasket(item)}
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            bottomDivider
        >
            <Avatar source={{uri: item.pictureUrl}} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.price} CHF / {item.unit}, {item.stock} en stock</ListItem.Subtitle>
                <TextInput
                    keyboardType="numeric"
                    value={item.quantity.toString()}
                    onChangeText={value => {
                        if (!isNaN(Number(value)))
                            basketContainer.addToBasket(item, Number(value))
                    }}
                />
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )

    return (
        <View>
            <View>
                <Text>Montant : {basketPrice}</Text>
                <Picker
                    onValueChange={(item) => setSelectedProduct(productContainer.products?.find(product => product.id == item) || null)}
                    selectedValue={selectedProduct?.id}
                >
                    <Picker.Item value={-1} label={"Choisir un produit"}/>
                    {
                        productContainer.products?.map(product => <Picker.Item key={product.id} value={product.id} label={product.name}/>)
                    }
                </Picker>
            </View>
            <SafeAreaView>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={productsFromBasketWithQuantity}
                    renderItem={renderItem}>
                </FlatList>
            </SafeAreaView>

            <Button
                title="Ajouter au panier"
                onPress={() => {
                    if (selectedProduct) {
                        basketContainer.addToBasket(selectedProduct, 1);
                    }
                }}
                disabled={selectedProduct == null}
            />
            <Button
                title="Valider le payement"
                onPress={() => {
                    if (selectedProduct) {
                        basketContainer.postBasketToApi(productsFromBasketWithQuantity)
                    }
                }}
                disabled={selectedProduct == null}
            />
        </View>
    )

}