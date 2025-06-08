import React, { useEffect, useState } from 'react';
import './SellerOrders.css';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchOrders = async (pageNum = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("Token not found. Redirecting to login.");
        window.location.href = '/login';
        return;
      }

      const res = await fetch(`http://localhost:5000/api/seller/orders?page=${pageNum}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.status === 401) {
        console.warn("Unauthorized or expired token. Redirecting to login.");
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Failed to fetch orders');

      if (Array.isArray(data)) {
        if (pageNum === 1) setOrders(data);
        else setOrders((prev) => [...prev, ...data]);
        setHasMore(data.length > 0);
      } else {
        setOrders([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = '/login';
        return;
      }

      const res = await fetch(`http://localhost:5000/api/seller/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.status === 401) {
        alert("Unauthorized or expired token.");
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading && orders.length === 0) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (orders.length === 0 && !loading) return <p>No orders found.</p>;

 return (
  <div className="orders-container">
    <h2>Orders</h2>
    {orders.map((order) => (
      <div key={order.id} className="order-card">
        <h3>Order ID: {order.id}</h3>
        <p>Customer: {order.customer.name} ({order.customer.email})</p>
        <p>Address: {order.customer.address}</p>
        <p>Status: <span className="status-text">{order.status}</span></p>

        <div>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.title} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {order.status === 'Pending' ? (
          <div className="order-actions">
            <button
              disabled={updatingOrderId === order.id}
              onClick={() => updateStatus(order.id, 'Accepted')}
            >
              Accept
            </button>
            <button
              disabled={updatingOrderId === order.id}
              onClick={() => updateStatus(order.id, 'Declined')}
            >
              Decline
            </button>
          </div>
        ) : (
          <p>No further action needed.</p>
        )}
      </div>
    ))}

    {hasMore && !loading && (
      <button className="load-more" onClick={() => setPage((p) => p + 1)}>Load More</button>
    )}
    {loading && orders.length > 0 && <p>Loading more orders...</p>}
  </div>
);

};

export default SellerOrders;
