import React, { useState } from "react";
import "./AdminPage.css";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import Categories from "./Categories";
import Products from "./Products";
import Order from "./Order"; // Menyudan kelayotgan buyurtmalar componenti

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("orders"); // Standart: "orders" yoki "settings"
  const [selectedCategory, setSelectedCategory] = useState("bread");

  return (
    <div className="admin-page">
      {/* Header-ga holat va uni o'zgartirish funksiyasini uzatamiz */}
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "orders" ? (
        /* Buyurtmalar bo'limi */
        <div className="admin-orders-tab">
          <Order />
        </div>
      ) : (
        /* Ma'lumotlarni o'zgartirish (Mahsulotlar va Kategoriyalar) bo'limi */
        <div className="admin-settings-tab">
          <StatsCards />
          <div className="admin-content">
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <Products selectedCategory={selectedCategory} />
          </div>
        </div>
      )}
    </div>
  );
}