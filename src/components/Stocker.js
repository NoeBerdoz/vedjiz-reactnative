import React, {useEffect, useState} from "react";
import {FlatList, TextInput, View, StyleSheet} from 'react-native';
import {Avatar, Button, Image, Input, ListItem, Text} from "react-native-elements";
import {ProductContainer, StockerContainer} from '../services';
import {Formik} from "formik";


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


    const renderItemStocker = ({item}) => (
        <View>
            <View style={styles.viewStocker}>
                <Image source={{uri: item.pictureUrl}}
                       style={{ width: 200, height: 200 }}
                />
                <Text>{item.name}</Text>
            </View>
            <Formik initialValues={{stock: item.stock.toString()}}
                    onSubmit={value => stockerContainer.addToStocker(item, value)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Text>Stock actuel:</Text>
                        <Input
                            onChangeText={handleChange('stock')}
                            onBlur={handleBlur('stock')}
                            keyboardType='phone-pad'
                            value={values.stock}
                        />
                        <Button onPress={handleSubmit} title="Valider le stock"/>
                    </View>

                )}
            </Formik>
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
