import { User } from './User';

export interface UserContext {
    user: User;
    setUser: (user: User) => void;
    isAuthenticated: boolean;
    logout: () => void;
}
