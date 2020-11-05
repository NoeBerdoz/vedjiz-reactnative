import React from 'react';
import { useState } from "react";
import {Map} from 'immutable';

export const useBasketContainer = () => {
    const [basket, setBasket] = useState(Map()); // useState return empty array when undefine

    const addToBasket = (product, quantity) => {
        setBasket(basket.set(product.id, quantity))
    }

    const removeFromBasket = (removeProduct) => {
        setBasket(basket.delete(removeProduct.id))
    }

    return {basket, addToBasket, removeFromBasket}

}