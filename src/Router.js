import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register';
import Products from './components/Products';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';

const Stack = createStackNavigator();

export default function Router() {


    let isLogged = false;
    let homePage;

    if (isLogged) {
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

