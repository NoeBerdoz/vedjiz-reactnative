import React from 'react';
import { useState } from "react";
import {Map} from 'immutable';

export const useBasketContainer = (UserContainer) => {
    // (HOF) Higher order function to work with unstated-next.
    // UserContainer is provided from Provider in index.js
    return () => {

        const userContainer = UserContainer.useContainer();
        const [basket, setBasket] = useState(Map()); // useState return empty array when undefine

        // API
        const axios = require('axios')

        const addToBasket = (product, quantity) => {
            setBasket(basket.set(product.id, quantity))
        }

        const removeFromBasket = (removeProduct) => {
            setBasket(basket.delete(removeProduct.id))
        }

        async function postBasketToApi(values: any) {
            console.log("values: "+values)
            console.log(userContainer.token)
            // Axios is waiting this: (url: string, data?: any, config?: AxiosRequestConfig)
            // url: string
            axios.post('api/baskets', {
                // data?:any
                purchases: values.map((value) => {
                    return {
                        product_id: value.id,
                        quantity: value.quantity
                    }
                })
            },  // config
                {headers: {
                    Authorization: "Bearer " + userContainer.token
                }}
                )
                .then(function (response: any) {
                    console.log(response)
                    setBasket(Map())
                })
                .catch(function (error: any) {
                    console.log(error)
                })
        }

        return {basket, addToBasket, removeFromBasket, postBasketToApi}

    }

}