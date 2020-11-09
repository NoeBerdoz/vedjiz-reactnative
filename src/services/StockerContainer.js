import React from 'react';
import { useState } from "react";
import {Map} from 'immutable';

export const useStockerContainer = (UserContainer) => {
    return () => {
        const userContainer = UserContainer.useContainer();
        const [stocker, setStocker] = useState(Map());

        const axios = require('axios')

        const addToStocker = (product, quantity) => {
            setStocker(stocker.set(product, quantity))
            console.log("addToStocker: "+stocker)

        }

        async function postStockerToApi(values: any) {
            console.log("PUSHING: "+stocker)
            axios.post('api/products/stock', {
                quantities: values.map((value) => {
                    return {
                        id: value.id,
                        quantity: value.quantity
                    }
                })
            },
            {headers: {
                Authorization: "Bearer " + userContainer.token
            }}
        )
            .then(function (response: any) {
                console.log(response)
                setStocker(Map())
            })
                .catch(function (error: any) {
                    console.log(error)
                })
        }

        return {stocker, addToStocker, postStockerToApi}
    }
}
