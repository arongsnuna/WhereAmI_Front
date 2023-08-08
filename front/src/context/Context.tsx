import React, { createContext, useReducer, ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { loginReducer } from '../reducer/LoginReducer';
import * as Api from '../api/index';
import jwtDecode from 'jwt-decode';

interface LoginResult {
    accessToken: string;
}

interface UserState {
    user: string | null;
    isLoggedIn: boolean;
    }

interface ContextProviderProps {
        children: ReactNode;
    }

type LoginAction =
| { type: 'LOGIN_SUCCESS'; payload: string }
| { type: 'LOGOUT' };

const storedToken = localStorage.getItem('user');
let parsedUser: string | null = null;

if (storedToken) {
    try {
        parsedUser = jwtDecode(storedToken) as string | null; // Asserting the type here
    } catch (e) {
        console.error('Error parsing stored token on initial load:', e);
    }
}


const initialState: UserState = {
    user: parsedUser,
    isLoggedIn: !!parsedUser,
};

export const UserContext = createContext<{
    userState: UserState;
    dispatch: React.Dispatch<LoginAction>;
    login: (userName: string, password: string) => void;
    logout: () => void;
}>({
    userState: initialState,
    dispatch: () => undefined,
    login: () => undefined,
    logout: () => undefined,
});

const ContextProvider: React.FC<ContextProviderProps> = ({ children }): React.ReactElement => {
    const [userState, dispatch] = useReducer(loginReducer, initialState);
    const queryClient = useQueryClient();

    const loginUser = useMutation<LoginResult, unknown, { username: string; password: string }>(
        (data: { username: string; password: string }) => 
            Api.postData<LoginResult>('/users/login', data),{
            onSuccess: (response: LoginResult) => {
                const { accessToken } = response;
                const decodedToken = jwtDecode(accessToken) as string;  // Asserting the type here
                console.log('Decoded token:', decodedToken);
                localStorage.setItem('user', accessToken);
                dispatch({ type: 'LOGIN_SUCCESS', payload: decodedToken });
            },
            onError: () => {
                console.log('%c 로그인 실패.', 'color: #d93d1a;');
            },
            onSettled: () => {
                queryClient.invalidateQueries('/users/login');
            },
        }
    );

    const login = (username: string, password: string) => {
        loginUser.mutate({ username, password });
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <UserContext.Provider value={{ userState, dispatch, login, logout }}>{children}</UserContext.Provider>
    );
};

export default ContextProvider;