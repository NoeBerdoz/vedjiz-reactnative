import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Button, Text, View} from 'react-native';

export default function Navbar() {
    const Tab = createBottomTabNavigator();
}


function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Market"
                onPress={() => navigation.navigate('Market')}/>
        </View>
    );
}

function MarketScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Market Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

return (
    <Tab.Navigator>
        <Tab.Screen name="Home"></Tab.Screen>
        <Tab.Screen name="Market"></Tab.Screen>
    </Tab.Navigator>
)
