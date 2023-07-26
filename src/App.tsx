import "./global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import Search from './pages/Search';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/search" element={<Search />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
        </Routes>
    </Router>
  )
}

export default App;
