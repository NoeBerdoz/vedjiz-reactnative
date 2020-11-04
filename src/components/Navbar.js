import React from 'react';
import Register from './Register';
import ProductNavigation from './ProductNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Basket from './Basket';

export default function Navbar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="Profile">
            <Tab.Screen
                name="Produits"
                component={ProductNavigation}
            />
            <Tab.Screen
                name="Panier"
                component={Basket}
            />
            <Tab.Screen
                name="MyProfile"
                component={Profile}
            />
        </Tab.Navigator>
    );

}
