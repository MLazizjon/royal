import React from "react";
import logoImg from "../../../assets/image.png";

export default function LoginLeft() {
  return (
    <div className="login-left">
      <div className="login-left-content">
        <img
          src={logoImg}
          alt="Royal Chicken"
          className="login-logo"
        />

        <h1 className="restaurant-title">
          Royal Chicken 
        </h1>

        <p className="restaurant-subtitle">
          Restoran Boshqaruvi
        </p>

        <div className="title-line"></div>
      </div>

      <div className="login-footer">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L4 5v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V5l-8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        <span>
          Premium Restoran Boshqaruvi Tizimi
        </span>
      </div>
    </div>
  );
}