import React from "react";
import LoginLeft from "./LoginLeft";
import LoginForm from "./LoginForm";
import "./Login.css"; // <--- Mana bu qatorni qo'shing

export default function Login() {
  return (
    <div className="login-page">
      <LoginLeft />
      <LoginForm />
    </div>
  );
}