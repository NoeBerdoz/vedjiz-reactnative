import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import ProductsList from './ProductsList';
import Product from './Product';

export default function ProductNavigation() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Products" component={ProductsList}/>
            <Stack.Screen name="Detail" component={Product}/>
        </Stack.Navigator>
    );
}
