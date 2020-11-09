import { createContainer } from 'unstated-next';
import { useUserContainer } from './UserContainer';
import { useProductContainer } from './ProductContainer';
import { useBasketContainer } from './BasketContainer';
import { useStockerContainer } from "./StockerContainer";

export const UserContainer = createContainer(useUserContainer);
export const ProductContainer = createContainer(useProductContainer(UserContainer));
export const BasketContainer = createContainer(useBasketContainer(UserContainer));
export const StockerContainer = createContainer(useStockerContainer(UserContainer));
