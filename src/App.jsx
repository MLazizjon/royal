import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent';

import Login from './pages/adminPage/login/login'; 
import AdminPanel from './pages/dashboard/AdminPage'; 

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Telegram foydalanuvchi ma'lumotlari
      const user = tg.initDataUnsafe?.user;
      const initData = tg.initData;

      if (user) {
        console.log("Telegram Foydalanuvchi:", user);
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          {/* Noto'g'ri routelarni bosh sahifaga yo'naltirish */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;