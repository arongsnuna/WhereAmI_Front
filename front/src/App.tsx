import "./global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import { loginReducer, UserState } from "./reducer/LoginReducer";
import ContextProvider from './context/Context';
import { useReducer } from "react";

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return (
    <ContextProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
          </Routes>
      </Router>
    </ContextProvider>
  )
}

export default App;