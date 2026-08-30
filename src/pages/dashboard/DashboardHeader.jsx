import "./DashboardHeader.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [logouting, setLogouting] = useState(false);

  const handleLogout = async () => {
    if (logouting) return;
    setLogouting(true);

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout xatosi:", err);
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 400);
    }
  };

  return (
    <header className="dashboard-header">
      {/* Brend nomi */}
      <div className="dashboard-brand">
        <div className="dashboard-title">
          <h1>Samarqand Un Oshi</h1>
          <span>RESTAURANT BOSHGARUVI</span>
        </div>
      </div>

      {/* Ma'lumotlarni o'zgartirish bo'limi ko'rsatkich sarlavhasi */}
      {/* <div className="dashboard-section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <span>Ma'lumotlarni o'zgartirish</span>
      </div> */}

      {/* Chiqish tugmasi */}
      <button
        type="button"
        className={`logout-btn ${logouting ? "logout-active" : ""}`}
        onClick={handleLogout}
      >
        <svg
          className="logout-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>

        <span className="logout-text">Tizimdan chiqish</span>
      </button>
    </header>
  );
}