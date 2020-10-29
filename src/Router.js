import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './components/Navbar';
import { UserContainer } from './services';
import Auth from './components/Auth';

export default function Router() {

    const userContainer = UserContainer.useContainer();

    let homePage;

    userContainer.refreshToken();
    if (userContainer.token) {
        homePage = <Navbar/>
    } else {
        homePage = <Auth/>
    }

    return (
        <NavigationContainer>
            {homePage}
        </NavigationContainer>
    );
}

