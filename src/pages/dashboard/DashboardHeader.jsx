import "./DashboardHeader.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabase";

export default function DashboardHeader({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [logouting, setLogouting] = useState(false);

  const handleLogout = async () => {
    if (logouting) return;
    setLogouting(true);

    try {
      // Supabase-dan tizimdan chiqish
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
          <h1>Royal Chicken</h1>
          <span>RESTAURANT</span>
        </div>
      </div>

      {/* Navigatsiya tugmalari */}
      <nav className="dashboard-nav">
        <button
          type="button"
          className={`nav-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Buyurtmalar
        </button>

        <button
          type="button"
          className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Ma'lumotlarni o'zgartirish
        </button>
      </nav>

      {/* Chiqish tugmasi */}
      <button
        type="button"
        className={`logout-btn ${logouting ? "logout-active" : ""}`}
        onClick={handleLogout}
      >
        <svg
          className="logout-icon"
          width="24"
          height="24"
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