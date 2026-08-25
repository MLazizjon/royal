import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import Toast from "../toast/Toast";

export default function LoginForm() {
  const navigate = useNavigate();

  const [value, setValue] = useState("+998");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePhoneChange = (phone) => {
    if (!phone) {
      setValue("+998");
      return;
    }

    // Faqat 13 ta belgigacha
    setValue(phone.slice(0, 13));
  };

  const handleLogin = () => {
    if (
      value === "+998973333036" &&
      password === "973333036"
    ) {
      navigate("/adminpanel");
    } else {  
      setShowToast(true);
      setHasError(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <>
      <Toast
        show={showToast}
        type="error"
        title="Kirish amalga oshmadi"
        message="Telefon raqami yoki parol noto'g'ri."
        onClose={() => {
          setShowToast(false);
          setHasError(false);
        }}
      />

      <div className="login-form-wrapper">
        <div className="login-card">
          <h1 className="login-title">
            Admin Panel
          </h1>

          <p className="login-description">
            Faqat administratorlar tizimga kirishi mumkin.
          </p>

          <div className="form-group">
            <label>Telefon raqami</label>

            <div className={hasError ? "phone-error" : ""}>
              <PhoneInput
                international
                defaultCountry="UZ"
                countryCallingCodeEditable={false}
                value={value}
                onChange={(phone) => {
                  handlePhoneChange(phone);
                  setHasError(false);
                }}
                placeholder="90 123 45 67"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Parolingiz</label>

            <div className="password-input">
              <span className="password-lock">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>

              <input
                className={hasError ? "input-error" : ""}
                type={showPassword ? "text" : "password"}
                placeholder="Parolingiz"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setHasError(false);
                }}
                style={{
                  paddingLeft: "52px",
                  paddingRight: "52px"
                }}
              />

              <button
                type="button"
                className="password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.86 21.86 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.86 21.86 0 0 1-2.17 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-box">
              <input type="checkbox" />
              <span>Eslab qolish</span>
            </label>

            <button
              type="button"
              className="forgot-password"
            >
              Parolni unutdingiz?
            </button>
          </div>

          <button
            type="button"
            className="login-button"
            onClick={handleLogin}
          >
            Admin Panelga kirish
            <span>→</span>
          </button>

          <div className="login-security">
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

            <span>Faqat ruxsat etilgan administratsiyalar uchun</span>
          </div>
        </div>
      </div>
    </>
  );
}