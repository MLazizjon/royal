import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent';

// Komponentlarni to'g'ri yo'l bilan import qilish
import Login from './pages/adminPage/login/login'; 
import AdminPanel from './pages/dashboard/AdminPage'; // O'z papkangizga qarab yo'lini to'g'rilang
// import NotFound from './components/NotFound'; // Agar bo'lmasa, yaratib qo'ying

function App() {
  return (
    <div className="App">

      <ToastContainer />


      <Routes>
        {/* Asosiy sahifa - Login */}
        <Route path="/" element={<Login />} />
        
        
        {/* Admin Panel yo'li */}
        <Route path="/adminpanel" element={<AdminPanel />} />

        {/* Topilmagan sahifalar uchun (404) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;