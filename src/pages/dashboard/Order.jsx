import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import './order.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handlePrintReceipt = (order) => {
    const printWindow = window.open('', '', 'width=400,height=600');
    
    const itemsHTML = Array.isArray(order.items)
      ? order.items.map((item) => {
          const name = typeof item.name === 'object' 
            ? item.name.uz || item.name.ru || item.name.en 
            : item.name;
          const qty = item.quantity || 1;
          const price = item.price || 0;
          return `
            <tr>
              <td>${name} x ${qty}</td>
              <td style="text-align: right;">${(price * qty).toLocaleString()} so'm</td>
            </tr>
          `;
        }).join('')
      : '';

    const receiptHTML = `
      <html>
        <head>
          <title>Chek №${order.id}</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              width: 280px;
              margin: 0 auto;
              padding: 10px;
              font-size: 12px;
              color: #000;
            }
            .text-center { text-align: center; }
            .line { border-bottom: 1px dashed #000; margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 3px 0; vertical-align: top; }
            .total { font-weight: bold; font-size: 14px; margin-top: 4px; }
          </style>
        </head>
        <body>
          <div class="text-center">
            <h3 style="margin: 0 0 4px 0;">CHEK</h3>
            <p style="margin: 2px 0;">Stol №: <strong>${order.table_number || '-'}</strong></p>
            <p style="margin: 2px 0;">Sana: ${order.created_at ? new Date(order.created_at).toLocaleString() : ''}</p>
          </div>
          <div class="line"></div>
          <table>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          <div class="line"></div>
          <div class="total">
            <table>
              <tr>
                <td>JAMI:</td>
                <td style="text-align: right;">${Number(order.total_price || 0).toLocaleString()} so'm</td>
              </tr>
            </table>
          </div>
          <div class="line"></div>
          <p class="text-center" style="margin-top: 10px;">Xaridingiz uchun rahmat!</p>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };

  return (
    <div className="admin-orders-container">
      <h2>Kelib tushgan buyurtmalar</h2>
      {loading ? (
        <p className="state-message">Yuklanmoqda...</p>
      ) : orders.length === 0 ? (
        <p className="state-message">Hozircha buyurtmalar yo'q.</p>
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
                        <strong className="item-qty">x {item.quantity || 1}</strong>
                      </span>
                      <span>
                        {((item.price || 0) * (item.quantity || 1)).toLocaleString()} so'm
                      </span>
                    </div>
                  ))}
              </div>

              <div className="order-footer">
                <div className="total-price-row">
                  <span>Jami:</span>
                  <strong>{Number(order.total_price || 0).toLocaleString()} so'm</strong>
                </div>
                
                <button 
                  className="print-btn" 
                  onClick={() => handlePrintReceipt(order)}
                >
                  🖨 Chek chiqarish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}