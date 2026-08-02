import React, { useState } from "react";
import "./AdminPage.css";

import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import Categories from "./Categories";
import Products from "./Products";


export default function AdminPage() {

  const [selectedCategory, setSelectedCategory] = useState("bread");

  return (
    <div className="admin-page">

      <DashboardHeader />

      <StatsCards />

      <div className="admin-content">

        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Products
          selectedCategory={selectedCategory}
        />

      </div>

    </div>
  );
}