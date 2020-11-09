import React from 'react';
import ProductNavigation from './ProductNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Basket from './Basket';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Stocker from "./Stocker";

export default function Navbar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={({route}) => ({
               tabBarIcon: ({ color, size }) => {
                   let iconName;
                   if (route.name === 'Panier') {
                       iconName = 'shopping-basket'
                   } else if (route.name === 'Produits') {
                       iconName = 'carrot'
                       return <Icon5 name={iconName} size={size} color={color}/>

                   } else if (route.name === 'MyProfile') {
                       iconName = 'user-o'
                   }
                   return <Icon name={iconName} size={size} color={color}/>
               },
            })}
            tabBarOptions={{
                activeTintColor: '#468ff7',
                inactiveTintColor: 'grey'
            }}
        >
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
            <Tab.Screen
                name="Stock"
                component={Stocker}
            />
        </Tab.Navigator>
    );

}
