import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent';

import Login from './pages/adminPage/login/login'; 
import AdminPanel from './pages/dashboard/AdminPage'; 

function App() {
  useEffect(() => {
    // Telegram Mini App tayyor bo'lganda ishga tushirish
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand(); // Ekran bo'ylab to'liq ochish
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;