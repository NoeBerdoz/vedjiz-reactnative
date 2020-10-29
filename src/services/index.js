import { createContainer } from 'unstated-next';
import { useUserContainer } from './UserContainer';
import { useProductContainer } from './ProductContainer';

export const UserContainer = createContainer(useUserContainer);
export const ProductContainer = createContainer(useProductContainer(UserContainer));
