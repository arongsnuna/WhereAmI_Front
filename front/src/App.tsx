import "./global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import MyPage from "./pages/MyPage";
import Bookmarks from "./pages/Bookmarks";
import SchedulerResult from "./pages/SchedulerResult";
import ContextProvider from './context/Context';

// const initialState: UserState = {
//   id:null,
//   accessToken: null,
//   isLoggedIn: false,
// };

function App() {
  const header = (
    <header className="fixed bottom-0 flex justify-between">
      <nav>
        <a href="/Bookmarks">북마크</a>
        <a href="/">여긴어디</a>
        <a href="/Mypage">마이</a>
      </nav>
    </header>
  );
  return (
    <div>
      <ContextProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/loginform" element={<LoginForm />} />
              <Route path="/RegisterForm" element={<RegisterForm />} />
              <Route path="/Mypage" element={<MyPage />} />
              <Route path="/Bookmarks" element={<Bookmarks />} />
              <Route path="/SchedulerResult" element={<SchedulerResult />} />
            </Routes>
        </Router>
        {header}
      </ContextProvider>
    </div>
  )
}

export default App
