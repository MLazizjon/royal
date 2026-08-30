import React, { useState, useEffect, useCallback } from "react";
import "./Categories.css";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronRight,
  FiX,
  FiUpload
} from "react-icons/fi";

import { supabase } from "../../supabase/supabase";

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [productsCount, setProductsCount] = useState({});
  const [showAll, setShowAll] = useState(false);

  // Edit modal holatlari
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Add modal holatlari
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form input state'lari
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [uploading, setUploading] = useState(false);

  // Supabase'dan ma'lumotlarni olish
  const fetchCategoriesAndProducts = useCallback(async () => {
    // Supabase'dagi 'royal_categories' jadvalidan olish
    const { data: catData, error: catError } = await supabase
      .from('royal_categories')
      .select('*');

    if (catError) {
      console.error("Kategoriyalarni olishda xatolik:", catError);
    } else {
      setCategories(catData || []);
      if (catData && catData.length > 0 && !selectedCategory) {
        setSelectedCategory(catData[0].id);
      }
    }

    // Supabase'dagi 'royal_products' jadvalidan olish
    const { data: prodData, error: prodError } = await supabase
      .from('royal_products')
      .select('category_id');

    if (!prodError && prodData) {
      const counts = {};
      prodData.forEach((item) => {
        counts[item.category_id] = (counts[item.category_id] || 0) + 1;
      });
      setProductsCount(counts);
    }
  }, [selectedCategory, setSelectedCategory]);

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, [fetchCategoriesAndProducts]);

  // Modalni tozalash va ochish
  const handleOpenAdd = () => {
    setNameUz("");
    setNameRu("");
    setNameEn("");
    setImage("");
    setStatus("active");
    setIsAddModalOpen(true);
  };

  // Edit modalini ochish
  const handleOpenEdit = (category, e) => {
    e.stopPropagation();
    setEditingCategory(category);
    setNameUz(category.name_uz || "");
    setNameRu(category.name_ru || "");
    setNameEn(category.name_en || "");
    setImage(category.image || "");
    setStatus(category.status || "active");
    setIsEditModalOpen(true);
  };

  // Rasmni Supabase Storage'ga yuklash
  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('mahsulot')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error("Supabase Storage Error:", uploadError);
        alert(`Storage xatosi: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage
        .from('mahsulot')
        .getPublicUrl(fileName);

      if (data && data.publicUrl) {
        setImage(data.publicUrl);
      }
    } catch (error) {
      console.error("Rasmni yuklashda kutilmagan xatolik:", error);
      alert("Rasmni yuklab bo'lmadi!");
    } finally {
      setUploading(false);
    }
  };

  // Yangi kategoriya yaratish
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    
    const baseSlug = nameEn 
      ? nameEn.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') 
      : 'category';
    const generatedId = `${baseSlug}-${Date.now()}`;

    const { error } = await supabase
      .from('royal_categories')
      .insert([
        {
          id: generatedId,
          name_uz: nameUz,
          name_ru: nameRu,
          name_en: nameEn,
          image: image,
          status: status,
        }
      ]);

    if (error) {
      console.error("Qo'shishda xatolik:", error);
      alert(`Xatolik yuz berdi: ${error.message}`);
    } else {
      setIsAddModalOpen(false);
      await fetchCategoriesAndProducts();
    }
  };

  // Kategoriyani yangilash
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    const { error } = await supabase
      .from('royal_categories')
      .update({
        name_uz: nameUz,
        name_ru: nameRu,
        name_en: nameEn,
        image: image,
        status: status,
      })
      .eq('id', editingCategory.id);

    if (error) {
      console.error("Yangilashda xatolik:", error);
      alert(`Xatolik yuz berdi: ${error.message}`);
    } else {
      setIsEditModalOpen(false);
      await fetchCategoriesAndProducts();
    }
  };

  // Kategoriyani o'chirish
  const handleDeleteCategory = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Haqiqatan ham bu kategoriyani o'chirmoqchimisiz?")) return;

    const { error } = await supabase
      .from('royal_categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("O'chirishda xatolik:", error);
      alert("O'chirishda xatolik! Unga bog'langan mahsulotlar bo'lishi mumkin.");
    } else {
      await fetchCategoriesAndProducts();
    }
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <div className="categories-card">
      <div className="categories-header">
        <h2>Kategoriyalar</h2>
        <button className="add-category-btn" onClick={handleOpenAdd}>
          <FiPlus /> Kategoriya qo'shish
        </button>
      </div>

      <div className="categories-list">
        {visibleCategories.map((category) => {
          const totalProducts = productsCount[category.id] || 0;
          const isSelected = selectedCategory === category.id;
          const catStatus = category.status || "active";

          return (
            <div
              key={category.id}
              className={`category-item ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="category-left">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name_uz || category.id}
                    className="category-image"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div className="category-info">
                  <h3>{category.name_uz}</h3>
                  <span>{totalProducts} ta mahsulot</span>
                </div>
              </div>

              <div className="category-actions">
                <span className={`status ${catStatus}`}>
                  {catStatus === "active" ? "Faol" : "Nofaol"}
                </span>
                <button 
                  className="edit-btn" 
                  onClick={(e) => handleOpenEdit(category, e)} 
                  title="Tahrirlash"
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="delete-btn" 
                  onClick={(e) => handleDeleteCategory(category.id, e)} 
                  title="O'chirish"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="categories-footer">
        <button className="view-category-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Kamroq ko'rsatish" : "Barcha kategoriyalarni ko'rish"}
          <FiChevronRight />
        </button>
      </div>

      {/* MODAL: QO'SHISH */}
      {isAddModalOpen && (
        <div className="category-modal-overlay">
          <div className="category-modal-content">
            <div className="modal-header-custom">
              <h3>Yangi kategoriya qo'shish</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateCategory} className="modal-form">
              <div className="form-group">
                <label>Nomi (UZ)</label>
                <input type="text" value={nameUz} onChange={(e) => setNameUz(e.target.value)} placeholder="Masalan: Ichimliklar" required />
              </div>
              <div className="form-group">
                <label>Nomi (RU)</label>
                <input type="text" value={nameRu} onChange={(e) => setNameRu(e.target.value)} placeholder="Напитки" required />
              </div>
              <div className="form-group">
                <label>Nomi (EN)</label>
                <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Drinks" required />
              </div>
              <div className="form-group">
                <label>Rasm (URL yoki kompyuterdan)</label>
                <div className="image-input-container">
                  <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." required />
                  <label className="file-upload-label" title="Fayl yuklash">
                    <FiUpload />
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                  </label>
                </div>
                {uploading && <span className="uploading-text" style={{ color: '#e74c3c', fontSize: '13px' }}>Rasm yuklanmoqda...</span>}
              </div>
              <div className="form-group">
                <label>Holati</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="active">Faol</option>
                  <option value="inactive">Nofaol</option>
                </select>
              </div>
              <button type="submit" className="modal-save-btn" disabled={uploading}>
                {uploading ? "Rasm yuklanmoqda..." : "Kategoriya qo'shish"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAHRIRLASH */}
      {isEditModalOpen && (
        <div className="category-modal-overlay">
          <div className="category-modal-content">
            <div className="modal-header-custom">
              <h3>Kategoriyani tahrirlash</h3>
              <button className="modal-close-btn" onClick={() => setIsEditModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleUpdateCategory} className="modal-form">
              <div className="form-group">
                <label>Nomi (UZ)</label>
                <input type="text" value={nameUz} onChange={(e) => setNameUz(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nomi (RU)</label>
                <input type="text" value={nameRu} onChange={(e) => setNameRu(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Nomi (EN)</label>
                <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Rasm URL</label>
                <div className="image-input-container">
                  <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                  <label className="file-upload-label" title="Yangi rasm yuklash">
                    <FiUpload />
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                  </label>
                </div>
                {uploading && <span className="uploading-text" style={{ color: '#e74c3c', fontSize: '13px' }}>Rasm yuklanmoqda...</span>}
              </div>
              <div className="form-group">
                <label>Holati</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="active">Faol</option>
                  <option value="inactive">Nofaol</option>
                </select>
              </div>
              <button type="submit" className="modal-save-btn" disabled={uploading}>
                {uploading ? "Rasm yuklanmoqda..." : "O'zgarishlarni saqlash"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}