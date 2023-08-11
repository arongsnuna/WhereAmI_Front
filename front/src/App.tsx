import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import MyPage from "./pages/MyPage";
import Bookmarks from "./pages/Bookmarks";
import SchedulerResult from "./pages/SchedulerResult";
import UpdateMyPage from "./pages/UpdateMyPage";
import MakeSchedule from "./pages/MakeSchedule";
import ContextProvider from "./context/Context";
import AllSchedule from "./pages/AllSchedule";

function App() {
  const header = (
    <header className="fixed bottom-0 flex justify-center bg-light-blue w-full p-2">
      <nav className="flex justify-around items-center w-full space-x-2">
        <a href="/" className="tooltip">
          <img
            src="/public/images/magnifying2.png"
            alt="검색 아이콘"
            className="w-5 h-5 sm:w-8 sm:h-8 md:w-11 md:h-11"
          />
          <span className="tooltip-text">검색</span>
        </a>
        <a href="/Mypage" className="tooltip">
          <img
            src="/public/images/user2.png"
            alt="마이 페이지 아이콘"
            className="w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12"
          />
          <span className="tooltip-text">마이</span>
        </a>
        <a href="/">
          <img
            src="/public/images/LogoIcon.png"
            alt="여긴 어디 아이콘"
            className="w-13 h-10 sm:w-24 sm:h-20 md:w-37 md:h-35"
          />
        </a>
        <a href="/Bookmarks" className="tooltip">
          <img
            src="/public/images/Like.png"
            alt="북마크 아이콘"
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11"
          />
          <span className="tooltip-text">북마크</span>
        </a>

        <a href="/AllSchedule" className="tooltip">
          <img
            src="/public/images/schedules2.png"
            alt="일정 아이콘"
            className="w-6 h-6 sm:w-9 sm:h-9 md:w-12 md:h-12"
          />
          <span className="tooltip-text">일정</span>
        </a>
      </nav>
    </header>
  );
  return (
    <div className="pb-16">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/Mypage" element={<MyPage />} />
            <Route path="/Bookmarks" element={<Bookmarks />} />
            <Route
              path="/SchedulerResult/:schedulerId"
              element={<SchedulerResult />}
            />
            <Route path="/UpdateMyPage" element={<UpdateMyPage />} />
            <Route path="/MakeSchedule" element={<MakeSchedule />} />
            <Route path="/AllSchedule" element={<AllSchedule />} />
          </Routes>
        </Router>
        <div style={{ position: "relative" }}>{header}</div>
      </ContextProvider>
    </div>
  );
}

export default App;
