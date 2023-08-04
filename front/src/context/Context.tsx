import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { loginReducer } from '../reducer/LoginReducer';
import * as Api from '../api/index';

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

    const loginUser = useMutation(
        (data: { username: string; password: string }) => Api.postData('/users/login', data),
        {
        onSuccess: (data) => {
            dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data.data.user,
            });
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