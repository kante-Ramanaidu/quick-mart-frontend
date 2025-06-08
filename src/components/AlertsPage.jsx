import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const AlertsPage = () => {
  const alerts = [
    { id: 1, message: 'Your order #1234 has been shipped.', type: 'info' },
    { id: 2, message: 'Service booking confirmed for tomorrow at 10 AM.', type: 'success' },
    { id: 3, message: 'Limited time offer: 20% off on groceries!', type: 'promo' },
  ];

  const getColor = (type) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'promo':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Your Alerts</h2>
      <div className="space-y-3">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-3 rounded shadow-sm flex items-start gap-2 ${getColor(alert.type)}`}
          >
            <FaExclamationCircle className="mt-1 text-lg" />
            <div>{alert.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
