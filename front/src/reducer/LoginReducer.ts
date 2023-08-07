export interface UserState {
    id: string|null;
    accessToken: string | null;
    isLoggedIn: boolean;
    }

type LoginAction =
    | { type: 'LOGIN_SUCCESS'; payload: {id: string; accessToken: string} }
    | { type: 'LOGOUT' };

export const loginReducer = (state:UserState, action:LoginAction):UserState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('id', action.payload.id);
            return { ...state, accessToken: action.payload.accessToken, id:action.payload.id, isLoggedIn: true };

        case 'LOGOUT':
            localStorage.removeItem('accessToken');
            localStorage.removeItem('id');
            return { ...state, accessToken: null, id:null, isLoggedIn: false };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
