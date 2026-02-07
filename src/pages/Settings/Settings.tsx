import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h1>Settings</h1>

        <div className="settings-section">
          <h2>Account</h2>
          <div className="settings-row">
            <span>Name</span>
            <strong>{user?.firstName} {user?.lastName}</strong>
          </div>
          <div className="settings-row">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
          <label className="settings-toggle">
            <input type="checkbox" />
            <span>Product updates</span>
          </label>
        </div>

        <div className="settings-section">
          <h2>Security</h2>
          <button className="settings-btn">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
