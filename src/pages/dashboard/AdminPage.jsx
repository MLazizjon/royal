import React, { useState, useEffect } from "react";
import "./AdminPage.css";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import Categories from "./Categories";
import Products from "./Products";
import Order from "./Order";

export default function AdminPage() {
  // activeTab holatini LocalStorage'dan o'qiymiz
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("admin_active_tab") || "orders";
  });

  // activeTab o'zgarganda uni LocalStorage'ga saqlaymiz
  useEffect(() => {
    localStorage.setItem("admin_active_tab", activeTab);
  }, [activeTab]);

  const [selectedCategory, setSelectedCategory] = useState("bread");

  return (
    <div className="admin-page">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "orders" ? (
        <div className="admin-orders-tab">
          <Order />
        </div>
      ) : (
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