interface UserState {
    user: string | null;
    isLoggedIn: boolean;
    }
    
type LoginAction =
    | { type: 'LOGIN_SUCCESS'; payload: string }
    | { type: 'LOGOUT' };

export const loginReducer = (state: UserState, action: LoginAction): UserState => {
    switch (action.type) {
    case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload, isLoggedIn: true };
    case 'LOGOUT':
        return { ...state, user: null, isLoggedIn: false };
    default:
        return state;
    }
};