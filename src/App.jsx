import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./style/StyleComponent";

import Login from "./pages/adminPage/login/login";
import AdminPanel from "./pages/dashboard/AdminPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminpanel" element={<AdminPanel />} />

        {/* Telegram har qanday URL yuborganda ham oq ekran bo'lmasligi uchun: */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
