import React from "react";
import "../toast/Toast.css";

export default function Toast({
  show,
  type = "error",
  title,
  message,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className={`toast toast-${type}`}>

      <div className="toast-line"></div>

      <div className="toast-icon">

        {type === "error" ? "❌" : "✅"}

      </div>

      <div className="toast-content">

        <h4>{title}</h4>

        <p>{message}</p>

      </div>

      <button
        className="toast-close"
        onClick={onClose}
      >
        ✕
      </button>

    </div>
  );
}