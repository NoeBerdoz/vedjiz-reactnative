import { Picker } from '@react-native-community/picker';
import React, {useMemo, useState} from 'react';
import { BasketContainer, ProductContainer } from '../services';
import {FlatList, View} from 'react-native';
import {Button, ListItem, Text} from 'react-native-elements';

export default function Basket() {

    const [selectedProduct, setSelectedProduct] = useState();
    const productContainer = ProductContainer.useContainer();
    const basketContainer = BasketContainer.useContainer();

    console.log(basketContainer)

    const basketPrice = useMemo(() => {
        let price = 0; // initialize price

        basketContainer.basket.forEach(function (product) {
            price += product.price;
        });
        return Math.round(price * 100) / 100; // Returns a supplied numeric expression rounded to the nearest integer.

    }, [basketContainer.basket])
    console.log()
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

            <FlatList
                data={basketContainer.basket}
                keyExtractor={((item => String(item.id)))}
                renderItem={({item}) =>
                    <ListItem
                        leftAvatar={{
                            source: {
                                uri: item.pictureUrl
                            }
                        }}
                        title={item.name}
                        subtitle={`CHF ${item.price}/${item.unit}, Stock: ${item.stock}`}
                        onPress={() => {
                            basketContainer.removeFromBasket(item);
                        }}
                        bottomDivider
                        chevron
                    />
                }
            />

            <Button
                title="Ajouter au panier"
                onPress={(value) => {
                    if (selectedProduct) {
                        basketContainer.addToBasket(selectedProduct);
                    }
                }}
                disabled={selectedProduct == null}
            />
        </View>
    )

}