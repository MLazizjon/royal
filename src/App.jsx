import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

      // Telegram'dan foydalanuvchi ma'lumotlarini va initData'ni olish
      const user = tg.initDataUnsafe?.user;
      const initData = tg.initData; // Backend'da xavfsizlikni tekshirish uchun zarur string

      if (user) {
        console.log("Telegram Foydalanuvchi:", user);
        // Masalan: user.id, user.first_name, user.username
        // Shu yerda foydalanuvchini avtomatik Login qilish mantiqini kiritsangiz bo'ladi
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;