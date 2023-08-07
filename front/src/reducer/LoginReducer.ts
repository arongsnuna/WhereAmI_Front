export interface UserState {
    user: string | null;
    isLoggedIn: boolean;
    }

type LoginAction =
    | { type: 'LOGIN_SUCCESS'; payload: string }
    | { type: 'LOGOUT' };

function assertNever(x: never): never {
    throw new Error(`Unexpected object: ${x}`);
    }

// export const loginReducer = (state: UserState, action: LoginAction): UserState => {
//     switch (action.type) {
//         case 'LOGIN_SUCCESS':
//         return {
//             ...state,
//             user: action.payload, // set user to the payload (which is the decoded token)
//             isLoggedIn: true,
//         };
//         case 'LOGOUT':
//         return {
//             ...state,
//             user: null,
//             isLoggedIn: false,
//         };
//         default:
//         return state;
//     }
// };

export const loginReducer = (state: UserState, action: LoginAction): UserState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload, isLoggedIn: true };
        
        case 'LOGOUT':
            localStorage.removeItem('user');
            return { ...state, user: null, isLoggedIn: false };

        default:
            return assertNever(action);
    }
};
