import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { loginReducer } from '../reducer/LoginReducer';
import * as Api from '../api/index';
import jwtDecode from 'jwt-decode';

interface UserState {
    user: string | null;
    isLoggedIn: boolean;
    }

    type LoginAction =
    | { type: 'LOGIN_SUCCESS'; payload: string }
    | { type: 'LOGOUT' };

    const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    };

    interface ContextProviderProps {
        children: ReactNode;
    }


    export const UserContext = createContext<{
    userState: UserState;
    dispatch: React.Dispatch<LoginAction>;
    login: (userName: string, password: string) => void;
    }>({
    userState: initialState,
    dispatch: () => undefined,
    login: () => undefined,
    });

    const ContextProvider: React.FC = ({ children }): React.ReactElement => {
        const [userState, dispatch] = useReducer(loginReducer, initialState);
        const queryClient = useQueryClient();

        useEffect(() => {
            const storedToken = localStorage.getItem('user');
            console.log('Stored token:', storedToken);
            if (storedToken) {
                try {
                    const parsedUser = jwtDecode(storedToken);
                    console.log('Parsed user:', parsedUser);
                    dispatch({ type: 'LOGIN_SUCCESS', payload: parsedUser });
                } catch(e) {
                    console.error('Error parsing stored token:', e);
                }
            }
        }, []);

    const loginUser = useMutation(
        (data: { username: string; password: string }) => Api.postData('/users/login', data),
        {
            onSuccess: (response) => {
                console.log(response.data);
                const { accessToken } = response.data;
                const decodedToken = jwtDecode(accessToken); // 토큰 디코드
                console.log('Decoded token:', decodedToken); // 디코드 토큰 디버깅
                dispatch({ type: 'LOGIN_SUCCESS', payload: decodedToken }); // 디코딩된 토큰을 payload에 dispatch
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

    return (
        <UserContext.Provider value={{ userState, dispatch, login }}>{children}</UserContext.Provider>
        );
    };

export default ContextProvider;