import React, {useCallback, useState} from 'react';
import Axios from "axios";

export const useProductContainer = (UserContainer) => {
    return () => {
        const userContainer = UserContainer.useContainer();
        const [products, setProducts] = useState([]); // initial state as array before products put inside

        const getProducts = async () => {
            try {
                const res = await Axios.get('api/products', {
                    headers: {
                        Authorization: "Bearer " + userContainer.token
                    }
                });

                setProducts(res.data.data.map((product: any) => {
                    product.pictureUrl = "http://10.0.2.2:8000/storage/pictures/" + product.picture;
                    return product
                }));
            } catch (e) {
                console.log(e)
            }
        };

        const getProduct = (id: number) => {
            return products.find((product: { id: number; }) => product.id === id)
        };

        const getProductByCurrent = (current: any) => {
            return products.filter((product: { current: number; }) => product.current === current)
        }

        return {products, getProducts, getProduct, getProductByCurrent}
    }
};
