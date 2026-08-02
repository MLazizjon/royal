import React, { useState, useEffect } from "react";
import {
  FiGrid,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { supabase } from "../../supabase/supabase"; // Supabase ulangan yo'lni o'zingiznikiga moslang
import "./StatsCards.css";

export default function StatsCards() {
  const [stats, setStats] = useState({
    categoriesCount: 0,
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
  });

  const [loading, setLoading] = useState(true);

  // Bazadan ma'lumotlarni sanab olish funksiyasi
  const fetchStats = async () => {
    try {
      setLoading(true);

      // 1. Kategoriyalar sonini olish
      const { count: catCount, error: catError } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      if (catError) console.error("Kategoriyalarni sanashda xato:", catError);

      // 2. Mahsulotlar va ularning statusini olish
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('status');

      if (prodError) {
        console.error("Mahsulotlarni olishda xato:", prodError);
      }

      const products = prodData || [];
      const total = products.length;

      // Status bo'yicha saralash
      const active = products.filter(
        (p) => !p.status || p.status === 'active' || p.status === 'true'
      ).length;

      const inactive = total - active;

      setStats({
        categoriesCount: catCount || 0,
        totalProducts: total,
        activeProducts: active,
        inactiveProducts: inactive,
      });
    } catch (error) {
      console.error("Statistikani yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="stats-cards">
      {/* Kategoriyalar kartasi */}
      <div className="stats-card">
        <div className="stats-icon red">
          <FiGrid />
        </div>
        <div className="stats-info">
          <p>Kategoriyalar</p>
          <h2>{loading ? "..." : stats.categoriesCount}</h2>
          <span>Jami kategoriyalar</span>
        </div>
      </div>

      {/* Jami mahsulotlar kartasi */}
      <div className="stats-card">
        <div className="stats-icon green">
          <FiPackage />
        </div>
        <div className="stats-info">
          <p>Mahsulotlar</p>
          <h2>{loading ? "..." : stats.totalProducts}</h2>
          <span>Jami mahsulotlar</span>
        </div>
      </div>

      {/* Faol mahsulotlar kartasi */}
      <div className="stats-card">
        <div className="stats-icon blue">
          <FiCheckCircle />
        </div>
        <div className="stats-info">
          <p>Faol mahsulotlar</p>
          <h2>{loading ? "..." : stats.activeProducts}</h2>
          <span>Faol</span>
        </div>
      </div>

      {/* Faol bo'lmagan mahsulotlar kartasi */}
      <div className="stats-card">
        <div className="stats-icon orange">
          <FiXCircle />
        </div>
        <div className="stats-info">
          <p>Nofaol mahsulotlar</p>
          <h2>{loading ? "..." : stats.inactiveProducts}</h2>
          <span>Nofaol</span>
        </div>
      </div>
    </div>
  );
}