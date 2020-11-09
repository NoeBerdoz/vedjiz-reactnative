import React from 'react';
import { useState } from "react";
import {Map} from 'immutable';

export const useStockerContainer = (UserContainer) => {
    return () => {
        const userContainer = UserContainer.useContainer();
        const [stocker, setStocker] = useState(Map)

        const axios = require('axios')

        const addToStocker = (product, quantity) => {
            setStocker(stocker.set(product.id, quantity))
            console.log(stocker)

        }

        return {stocker, addToStocker}
    }
}
