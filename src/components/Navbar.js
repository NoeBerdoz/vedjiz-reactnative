import React from 'react';
import Register from './Register';
import ProductsList from './ProductsList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Navbar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Produits"
                component={ProductsList}
            />
            <Tab.Screen
                name="Profile"
                component={Register}
            />
        </Tab.Navigator>
    );

}
