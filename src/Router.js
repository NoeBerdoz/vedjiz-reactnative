import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register';
import Products from './components/Products';
import { UserContainer } from './services';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';

const Stack = createStackNavigator();

export default function Router() {

    const userContainer = UserContainer.useContainer();

    let homePage;

    userContainer.refreshToken();
    if (userContainer.token) {
        homePage = <Stack.Screen name="Produits" component={Products}/>
    } else {
        homePage = <Stack.Screen name="Inscription" component={Register}/>
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {homePage}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

