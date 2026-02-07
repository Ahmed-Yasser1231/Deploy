import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FolderKanban, 
  Users, 
  MessageSquare, 
  Bell,
  Settings,
  PlusCircle,
  TrendingUp,
  Heart,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const entrepreneurMenuItems = [
    { path: '/explore', icon: FolderKanban, label: 'Explore Projects' },
    { path: '/my-projects', icon: FolderKanban, label: 'My Projects' },
    { path: '/create-project', icon: PlusCircle, label: 'Create Project' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const investorMenuItems = [
    { path: '/explore', icon: FolderKanban, label: 'Explore Projects' },
    { path: '/create-project', icon: PlusCircle, label: 'Create Project' },
    { path: '/recommendations', icon: Heart, label: 'Recommendations' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const menuItems = user?.role === 'entrepreneur' ? entrepreneurMenuItems : investorMenuItems;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="user-info">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="sidebar-avatar" />
            ) : (
              <div className="sidebar-avatar-placeholder">
                {user?.firstName?.charAt(0) || 'U'}
              </div>
            )}
            <div className="user-details">
              <span className="user-name">{user?.firstName} {user?.lastName}</span>
              <span className="user-role">{user?.role === 'entrepreneur' ? 'Entrepreneur' : 'Investor'}</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          <NavLink to="/settings" className="nav-item" onClick={onClose}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
