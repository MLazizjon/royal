import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import './order.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Bazadagi mavjud buyurtmalarni yuklab olish
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Buyurtmalarni yuklashda xato:", error.message);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // 2. Supabase Realtime obunasi — faqat yangi INSERT bo'lganda tetiklashadi
    const channel = supabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders((prevOrders) => [payload.new, ...prevOrders]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="admin-orders-container">
      <h2>Kelib tushgan buyurtmalar</h2>
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : orders.length === 0 ? (
        <p>Hozircha buyurtmalar yo'q.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className={`order-card status-${order.status}`}>
              <div className="order-header">
                <h3>Stol №: {order.table_number}</h3>
                <span className="order-time">
                  {order.created_at ? new Date(order.created_at).toLocaleTimeString() : ''}
                </span>
              </div>
              <div className="order-items">
                {Array.isArray(order.items) &&
                  order.items.map((item, idx) => (
                    <div key={idx} className="order-item-line">
                      <span>
                        {typeof item.name === 'object'
                          ? item.name.uz || item.name.ru || item.name.en
                          : item.name}{' '}
                        x {item.quantity || 1}
                      </span>
                      <span>
                        {((item.price || 0) * (item.quantity || 1)).toLocaleString()} so'm
                      </span>
                    </div>
                  ))}
              </div>
              <div className="order-footer">
                <strong>Jami: {Number(order.total_price || 0).toLocaleString()} so'm</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}