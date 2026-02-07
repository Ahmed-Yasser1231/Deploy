import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../data/mockData';
import './Notifications.css';

const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead } = useAuth();

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="title">
          <Bell size={20} />
          <h1>Notifications</h1>
        </div>
        <p>All recent updates and alerts.</p>
      </div>

      <div className="notifications-list">
        {notifications.map((n) => (
          <div key={n.id} className={`notification-card ${n.read ? '' : 'unread'}`}>
            <div className="notification-main">
              <div className="notification-title-row">
                <h3>{n.title}</h3>
                <span className="notification-type">{n.type}</span>
              </div>
              <p className="notification-message">{n.message}</p>
              <div className="notification-meta">
                <span>{formatDate(n.createdAt)}</span>
                {n.link && (
                  <Link to={n.link} className="notification-link">
                    View related
                  </Link>
                )}
              </div>
            </div>
            {!n.read && (
              <button
                className="mark-read-btn"
                onClick={() => markNotificationAsRead(n.id)}
              >
                <CheckCircle size={16} />
                Mark as read
              </button>
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="notifications-empty">
            <p>No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
