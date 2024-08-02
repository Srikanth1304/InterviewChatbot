import React from 'react';
import { useLocation } from 'react-router-dom';

const NotificationPage = () => {
  const location = useLocation();
  const notificationMessage = location.state?.notificationMessage;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Interview Notifications</h2>
      <div className="notification-list">
        {notificationMessage && (
          <div className="notification mb-4 p-4 bg-gray-100 rounded-lg">
            <h3>{notificationMessage}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
