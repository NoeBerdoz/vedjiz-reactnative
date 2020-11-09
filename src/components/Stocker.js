import React, {useEffect, useState} from "react";
import {FlatList, TextInput, View, StyleSheet} from 'react-native';
import {Avatar, Button, Image, Input, ListItem, Text} from "react-native-elements";
import {ProductContainer, StockerContainer} from '../services';
import {Formik} from "formik";


export default function Stocker() {

    const productContainer = ProductContainer.useContainer();
    const stockerContainer = StockerContainer.useContainer();
    const [isLoading, setIsLoading] = useState(false);

    let allProducts = productContainer.products

    const [actualProduct, setActualProduct] = useState(allProducts);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setActualProduct(allProducts);
    }, [allProducts])

    function nextProduct() {
        setIndex(index === actualProduct.length -1 ? 0 : index + 1);
    }

    function previousProduct() {
        setIndex(index === 0 ? actualProduct.length -1 : index -1);
    }

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

    return (
        <View>
            <Text h1>Validation du stock</Text>
            <View style={styles.viewStocker}>
                <Text h2>{actualProduct[index].name}</Text>
                <Image source={{uri: actualProduct[index].pictureUrl}} style={{ width: 200, height: 200 }} />
                <View style={styles.viewButtons}>
                    <Button onPress={previousProduct} title="Précédent"/>
                    <Button onPress={nextProduct} title="Suivant" />
                </View>
            </View>
            <Formik initialValues={{quantity: actualProduct[index].stock.toString()}}
                    onSubmit={
                        value => {
                            stockerContainer.addToStocker(actualProduct, value)
                            stockerContainer.postStockerToApi(stockerContainer.stocker)
                            nextProduct();
                        }
                    }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Text style={styles.textUnit}>Stock actuel en {actualProduct[index].unit}</Text>
                        <Input
                            onChangeText={handleChange('quantity')}
                            onBlur={handleBlur('quantity')}
                            keyboardType='decimal-pad'
                            placeholder={actualProduct[index].stock.toString()}
                            value={values.quantity}
                        />
                        <Button onPress={handleSubmit} title="Valider le stock"/>
                    </View>

                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStocker: {
        alignItems: 'center',
    },

    viewButtons: {
        alignItems: 'center',
        flexDirection:'row',
    },

    textUnit: {
        fontSize: 20,
        marginTop: 20,
        textAlign: "center"
    },

})
