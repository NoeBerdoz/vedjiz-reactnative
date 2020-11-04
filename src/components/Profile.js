import React, {useEffect} from 'react';
import {UserContainer} from '../services';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
export default function Profile() {

    const userContainer = UserContainer.useContainer();

    let clearAsyncStorage = async () => {
        AsyncStorage.clear();
        userContainer.refreshToken();
    };

    useEffect( () => {
        if (userContainer.token) {
            userContainer.currentUser(userContainer.token);
            userContainer.currentUserBalance(userContainer.token);
        }
    }, [userContainer.token]
    )

    console.log(userContainer.balance)

    return (
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
