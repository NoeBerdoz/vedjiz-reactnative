import React from 'react';
import { useState } from "react";

export const useBasketContainer = () => {
    const [basket, setBasket] = useState([]); // useState return empty array when undefine

    const addToBasket = (product) => {
        setBasket(basket => [...basket, product])
    }

    const removeFromBasket = (removeProduct) => {
        setBasket(basket.filter(product => product !== removeProduct))
    }

    return {basket, addToBasket, removeFromBasket}

}