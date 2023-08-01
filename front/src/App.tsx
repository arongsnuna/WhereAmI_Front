import "./global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
        </Routes>
    </Router>
  )
}

export default App
