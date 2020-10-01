import React, { useState } from 'react';
import Axios from "axios";
import { UserContainer } from './index';

export const useProductContainer = () => {
    const userContainer = UserContainer.useContainer();
    const [products, setProducts] = useState();

    const getProducts = async () => {
        try {
            const res = await Axios.get('api/products', {
                headers: {
                    Authorization: "Bearer " + userContainer.token
                }
            });

            setProducts(res.data.data.map((product: any) => {
                return product
            }));
        } catch (e) {
            console.log(e)
        }
    };

    const getProduct = (id: number) => {
        return products.find((product: { id: number; }) => product.id === id)
    };

    return {products, getProducts, getProduct}
};
