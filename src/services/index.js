import { createContainer } from 'unstated-next';
import { useUserContainer } from './UserContainer';
import { useProductContainer } from './ProductContainer';
import { useBasketContainer } from './BasketContainer';

export const UserContainer = createContainer(useUserContainer);
export const ProductContainer = createContainer(useProductContainer(UserContainer));
export const BasketContainer = createContainer(useBasketContainer);
