import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import investoLogo from '../../assets/investoB.svg';
import './Navbar.css';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout, unreadNotifications } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <Link to="/" className="navbar-brand">
          <img src={investoLogo} alt="Investo" style={{ width: '150px', height: '150px' }} />
        </Link>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search projects, investors..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        <div className="notification-container">
          <button 
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <button className="mark-all-btn">Mark all as read</button>
              </div>
              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notification-content">
                    <p className="notification-title">New Investor Match</p>
                    <p className="notification-text">Sarah Ahmed matches 92% with your project</p>
                    <span className="notification-time">2 hours ago</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-content">
                    <p className="notification-title">Project Approved</p>
                    <p className="notification-text">Your project EcoTrack is now live</p>
                    <span className="notification-time">1 day ago</span>
                  </div>
                </div>
              </div>
              <Link to="/notifications" className="view-all-btn">
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <div className="user-menu">
          <button 
            className="user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="user-avatar" />
            ) : (
              <div className="user-avatar-placeholder">
                {user?.firstName?.charAt(0) || 'U'}
              </div>
            )}
            <span className="user-name">{user?.firstName} {user?.lastName}</span>
          </button>
          {showDropdown && (
            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item">
                <User size={16} />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item">
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <hr className="dropdown-divider" />
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
