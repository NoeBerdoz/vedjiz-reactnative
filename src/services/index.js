import { createContainer } from 'unstated-next';
import { useUserContainer } from './UserContainer';

export const UserContainer = createContainer(useUserContainer);
