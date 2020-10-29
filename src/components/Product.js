import React, {Fragment} from 'react';
import {View} from 'react-native';
import {ProductContainer} from '../services';

import {PricingCard, Text} from 'react-native-elements';
import {StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';


export default function Product({ route }) {
    
    // Get data from param in ProductList
    const { itemID } = route.params;

    const {products} = ProductContainer.useContainer();
    const product = products.find(product => product.id === itemID)

    return (
        <View>
            <Image
                source={{ uri: product.pictureUrl }}
                style={{ width: 500, height: 100 }}
                PlaceholderContent={<ActivityIndicator />}
            />
            <PricingCard
                color="#4f9deb"
                title={product.name}
                price={product.price+" CHF / "+product.unit}
                info={[product.details] }
                button={{ title: 'Acheter' }}
                onButtonPress={() => console.log({product})}
            />

            <View style={styles.supplierView}>
                <Text style={styles.headingSupplier}>Fournisseurs :</Text>
                {
                    product.suppliers.map(supplier => {
                        return (
                            <View key={supplier.pivot.supplier_id}>
                                <Text style={styles.supplierText}>{supplier.city}, {supplier.company_name}</Text>
                            </View>
                        )
                    })
                }
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    supplierView: {
        backgroundColor: "white",
        borderColor: "#dedbed",
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderWidth: 1,

    },

    supplierText: {
        color: "#797979",
        fontWeight: "bold"


    },

    headingSupplier: {
        color: "#468ff7",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 5
    }
});

