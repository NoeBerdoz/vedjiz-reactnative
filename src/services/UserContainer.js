import React from 'react';
import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

const TOKEN_KEY = "@TOKEN";

export const useUserContainer = () => {
    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const login = async (value: any) => {
        try {
            await AsyncStorage.setItem(TOKEN_KEY, value)
            setToken(value);
        } catch(e) {
            // TAKE ERROR
        }
    }

    const refreshToken = async () => {
        let token = await AsyncStorage.getItem(TOKEN_KEY);

        setToken(token ? token : undefined);
    }

    const currentUser = async (token) => {
        Axios.get("api/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(function (response: any) {
                setUser(response.data.data);
            })
            .catch(function (error: any) {
                console.log(error);
            })
    }

    return {token, setToken, login, refreshToken, currentUser, user};
}
