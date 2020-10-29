import React from 'react';
import Register from './Register';
import ProductNavigation from './ProductNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Navbar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Produits"
                component={ProductNavigation}
            />
            <Tab.Screen
                name="Profile"
                component={Register}
            />
        </Tab.Navigator>
    );

}
