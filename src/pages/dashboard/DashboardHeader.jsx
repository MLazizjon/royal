import "./DashboardHeader.css";
import logo from "../../../src/pages/adminPage/login/images/photo_2026-08-02_13-52-01-removebg-preview.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {

  const navigate = useNavigate();

  const [logouting, setLogouting] = useState(false);

  const handleLogout = () => {

    if (logouting) return;

    setLogouting(true);

    setTimeout(() => {

      navigate("/");

    }, 500);

  };

  return (
    <header className="dashboard-header">

      <div className="dashboard-brand">

        <img
          src={logo}
          alt="Shirin Tabaka"
          className="dashboard-logo"
        />

        <div className="dashboard-title">

          <h1>Shirin Tabaka</h1>

          <span>RESTAURANT</span>

        </div>

      </div>

      <button
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>

        <span className="logout-text">
          Tizimdan chiqish
        </span>

      </button>

    </header>
  );
}