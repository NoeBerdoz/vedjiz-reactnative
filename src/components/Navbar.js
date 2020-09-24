import React from 'react';
import Register from './Register';
import Products from './Products';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Navbar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Produits"
                component={Products}
            />
            <Tab.Screen
                name="Profile"
                component={Register}
            />
        </Tab.Navigator>
    );

}
