export interface UserState {
    id: string|null;
    accessToken: string | null;
    isLoggedIn: boolean;
    bookmarks: number[];
}

function assertNever(x: never): never {
    throw new Error(`Unexpected object: ${x}`);
}

type LoginAction =
    | { type: 'LOGIN_SUCCESS'; payload: {id: string; accessToken: string} }
    | { type: 'LOGOUT' }
    | { type: 'ADD_BOOKMARK'; payload: { landmarkId: number } }
    | { type: 'REMOVE_BOOKMARK'; payload: { landmarkId: number } };

export const loginReducer = (state:UserState, action:LoginAction):UserState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('accessToken', action.payload.accessToken);
            return { ...state, accessToken: action.payload.accessToken, id:action.payload.id, isLoggedIn: true };

        case 'LOGOUT':
            localStorage.removeItem('accessToken');
            localStorage.removeItem('id');
            return { ...state, accessToken: null, id:null, isLoggedIn: false };

            case 'ADD_BOOKMARK':
                // Check if the bookmark already exists to avoid duplicates
                if (state.bookmarks.includes(action.payload.landmarkId)) {
                    return state; // Return current state without changes
                }
                return { ...state, bookmarks: [...state.bookmarks, action.payload.landmarkId] };
    
            case 'REMOVE_BOOKMARK':
                return { ...state, bookmarks: state.bookmarks.filter(id => id !== action.payload.landmarkId) };
    
            default:
                return assertNever(action);
    }
};
