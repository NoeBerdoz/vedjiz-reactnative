import React, {useEffect} from 'react';
import {UserContainer} from '../services';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, Text} from 'react-native-elements';
export default function Profile() {

    const userContainer = UserContainer.useContainer();

    let clearAsyncStorage = async () => {
        AsyncStorage.clear();
        userContainer.refreshToken();
    };

    useEffect( () => {
        if (userContainer.token) {
            userContainer.currentUser(userContainer.token);
        }
    }, [userContainer.token]
    )

    return (
        <View>
            <Text style={styles.textHeader}>Votre Prénom :</Text>
            <Text style={styles.textSimple}>{userContainer.user?.firstname}</Text>
            <Text style={styles.textHeader}>Votre Nom :</Text>
            <Text style={styles.textSimple}>{ userContainer.user?.lastname}</Text>
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
