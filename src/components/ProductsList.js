import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import { ProductContainer } from '../services';
import {Avatar, ListItem, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import TouchableScale from 'react-native-touchable-scale';

export default function ProductsList() {

    const navigation = useNavigation();

    const productContainer = ProductContainer.useContainer();

    const [isLoading, setIsLoading] = useState(false);
    // Switch state for filter
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    console.log(isEnabled)

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
            onPress={() => { navigation.navigate('Detail', {
                itemID: item.id
                })
            }}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            bottomDivider
        >
            <Avatar source={{uri: item.pictureUrl}} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.price} CHF / {item.unit}, {item.stock} en stock</ListItem.Subtitle>
                <ListItem.Subtitle>{item.current ? "De saison" : "Pas de saison"}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )

    return (
        <View>
            <View style={styles.switchView}>
                <Text style={styles.textSwitch}>Trier les légumes par saison :</Text>
                <Switch
                    style={styles.switchStyle}
                    trackColor={{ false: "#767577", true: "#009933" }}
                    thumbColor={isEnabled ? "#009933" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <Divider
                style={{ backgroundColor: 'grey' }}
            />
            <SafeAreaView>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={isEnabled ? productContainer.products.filter(product => product.current === 1) : productContainer.products}
                    renderItem={renderItem}
                    refreshing={isLoading}
                    onRefresh={loadProducts}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    switchView: {
        alignItems: "center",
        backgroundColor: "white"
    },

    switchStyle: {

    },

    textSwitch: {
        fontSize: 20,
    }

});
