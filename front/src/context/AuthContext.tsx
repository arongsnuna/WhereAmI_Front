// src/contexts/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// AuthContext 상태 타입 정의
interface AuthState {
  id: string | null;
  accessToken: string | null;
}

// AuthContext 초기값 설정
const initialAuthState: AuthState = {
  id: null,
  accessToken: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

// AuthContext 생성
const AuthContext = createContext<{
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}>({
  authState: initialAuthState,
  setAuthState: () => {},
});

// AuthProvider 컴포넌트 정의
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅 생성
export const useAuth = () => useContext(AuthContext);
