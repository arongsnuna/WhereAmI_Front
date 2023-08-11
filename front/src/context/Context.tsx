import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { loginReducer } from '../reducer/LoginReducer';
import * as Api from '../api/index';
import jwtDecode from 'jwt-decode';

interface LoginResult {
    id: string;
    accessToken: string;
}

interface UserState {
    id: string | null;
    accessToken: string | null;
    isLoggedIn: boolean;
}

interface ContextProviderProps {
    children: ReactNode;
}

type LoginAction =
    | { type: 'LOGIN_SUCCESS'; payload: {id: string; accessToken: string} }
    | { type: 'LOGOUT' };
const LOGIN_API_ROUTE = '/users/login';

const initialState: UserState = {
    id:null,
    accessToken: null,
    isLoggedIn: false,
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
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const id = localStorage.getItem('id');
        if (storedToken) {
            try {
                dispatch({ type: 'LOGIN_SUCCESS', payload: {id: id || '', accessToken: storedToken}});
            } catch(e) {
                console.error('Error parsing stored token:', e);
            }
        }
    }, []);

    const loginUser = useMutation<LoginResult, unknown, { username: string; password: string }>(
        (data: { username: string; password: string }) => Api.postData<LoginResult>(LOGIN_API_ROUTE, data),
        {
            onSuccess: (response: LoginResult) => {
                const { id, accessToken } = response;
                const decodedToken = jwtDecode(accessToken) as  string; // 토큰 디코드
                localStorage.setItem('accessToken', decodedToken);
                localStorage.setItem('id', id);
                dispatch({ type: 'LOGIN_SUCCESS', payload: {id, accessToken: decodedToken} }); // 디코딩된 토큰을 payload에 dispatch
            },

            onError: () => {
                console.log('%c 로그인 실패.', 'color: #d93d1a;');
            },
            onSettled: () => {
                queryClient.invalidateQueries(LOGIN_API_ROUTE);
            },
        }
    );

    const login = (username: string, password: string) => {
        loginUser.mutate({ username, password });
    };
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        dispatch({ type: 'LOGOUT' });
    };


    return (
        <UserContext.Provider value={{ userState, dispatch, login,logout }}>{children}</UserContext.Provider>
        );
    };

export default ContextProvider;
