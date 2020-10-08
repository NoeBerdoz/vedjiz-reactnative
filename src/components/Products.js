import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import { ProductContainer } from '../services';
import { ListItem } from 'react-native-elements';

export default function Products() {

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

    // Example console.log
    if(productContainer.products)
        productContainer.products.forEach(product => console.log(product.pictureUrl))

    return (
        <View>
            <FlatList
                data={productContainer.products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                <ListItem
                    leftAvatar={{
                        source: {
                            uri: item.pictureUrl
                        }

                    }}
                    title={item.name}
                />
                }
                onRefresh={loadProducts}
                refreshing={isLoading}
            />
        </View>
    );
}
