import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent';

import Login from './pages/adminPage/login/login'; 
import AdminPanel from './pages/dashboard/AdminPage'; 

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        {/* Asosiy sahifa - Login */}
        <Route path="/" element={<Login />} />
        
        {/* Admin Panel yo'li */}
        <Route path="/adminpanel" element={<AdminPanel />} />

        {/* Telegram parametrlari kelganda ham Login sahifasini ochish uchun: */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;