import React from 'react';
import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const TOKEN_KEY = "@TOKEN";

export const useUserContainer = () => {
    const [token, setToken] = useState();

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

        if (token){
            setToken(token);
        }
    }

    return {token, setToken, login, refreshToken};
}
