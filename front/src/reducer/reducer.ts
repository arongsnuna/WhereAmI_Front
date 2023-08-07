import {User} from '../interface/user';

  export interface UserState {
    userList: User[];
    user: User | null;
  }

  export type LoginAction =
    | { type: "LOGIN_SUCCESS"; payload: User }
    | { type: "LOGOUT" };

  export function loginReducer(userState: UserState, action: LoginAction): UserState {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        console.log("%c로그인!", "color: #d93d1a;");
        return {
          ...userState,
          user: action.payload,
        };
      case "LOGOUT":
        console.log("%c로그아웃!", "color: #d93d1a;");
        return {
          ...userState,
          user: null,
        };
      default:
        return userState;
    }
  }
