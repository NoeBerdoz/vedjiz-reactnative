import React, {useEffect, useState} from 'react';
import {BasketContainer, UserContainer} from '../services';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Button, Divider, ListItem, Text} from 'react-native-elements';
export default function Profile() {

    const userContainer = UserContainer.useContainer();
    const basketContainer = BasketContainer.useContainer();

    const [isLoading, setIsLoading] = useState(false);

    let clearAsyncStorage = async () => {
        AsyncStorage.clear();
        userContainer.refreshToken();
    };

    useEffect( () => {
        if (userContainer.token) {
            userContainer.currentUser(userContainer.token);
            loadBalance();
        }
    }, [userContainer.token]
    )

    useEffect(() => {
        loadBalance()
    }, [basketContainer.basket])

    const loadBalance = async() => {
        try {
            setIsLoading(true);
            await userContainer.currentUserBalance(userContainer.token)
        } catch (e) {
            console.log("e")
        } finally {
            setIsLoading(false);
        }
    }

    console.log(userContainer.balance)

    return (
        <View>
            <View>
                <Text style={styles.textHeader}>Votre Prénom :</Text>
                <Text style={styles.textSimple}>{userContainer.user?.firstname}</Text>
                <Text style={styles.textHeader}>Votre Nom :</Text>
                <Text style={styles.textSimple}>{ userContainer.user?.lastname}</Text>
                <Text style={styles.textHeader}>Votre solde :</Text>
                <Text style={styles.textSimple}>Débit : {userContainer.balance?.debit}</Text>
                <Text style={styles.textSimple}>Crédit : {userContainer.balance?.credit}</Text>
                <Button
                    title="Se déconnecter"
                    onPress={clearAsyncStorage}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 25,
        marginLeft: 10,
        marginBottom: 5
    },

    textSimple: {
        marginLeft: 10,
        marginBottom: 20,

    }

});
