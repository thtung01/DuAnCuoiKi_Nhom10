import React from 'react';
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './Sidebar.less';
import { NAV_EMPLOYEE, defaultUser } from '@/services/Khách hàng/Sidebar';
import { useModel, history } from 'umi';

const Sidebar: React.FC = () => {
  const { page, setPage, isSidebarOpen, setIsSidebarOpen } = useModel('Khách Hàng.global');
  const { role, setRole, currentUser } = useModel('Khách Hàng.user');
  const { cart, setCartOpen } = useModel('Khách Hàng.Thực đơn.index');
  const { unreadCount, setIsNotificationOpen } = useModel('Khách Hàng.Notifications');

  const user = currentUser || defaultUser;

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="brand">
        <img src="/logo.webp" alt="Logo" className="brand-logo" />
        <div className="brand-text">
          <div className="brand-name">Căng tin</div>
          <div className="brand-sub">DOANH NGHIỆP</div>
        </div>
      </div>

      <div className="role-switcher">
        <button
          className={role === 'employee' ? 'active' : ''}
          onClick={() => setRole('employee')}
        >
          <UserOutlined style={{ fontSize: '13px' }} /> Người dùng
        </button>
      </div>

      <nav className="nav-section">
        <div className="nav-label">ĐẶT MÓN</div>
        {NAV_EMPLOYEE.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => {
                if (item.id === 'cart') {
                  setCartOpen(true);
                } else {
                  setPage(item.id);
                }
                setIsSidebarOpen(false); // Close sidebar on mobile item click
              }}
            >
              <Icon style={{ fontSize: '18px' }} />
              {item.label}
              {item.id === 'cart' && cart.length > 0 && <span className="badge">{cart.length}</span>}
            </button>
          );
        })}
      </nav>

      <nav className="nav-section">
        <div className="nav-label">KHÁC</div>
        <button className="nav-item" onClick={() => { setIsNotificationOpen(true); setIsSidebarOpen(false); }}>
          <BellOutlined style={{ fontSize: '18px' }} /> Thông báo
          {unreadCount > 0 && <span className="badge notification-badge">{unreadCount}</span>}
        </button>
        <button 
          className={`nav-item ${page === 'settings' ? 'active' : ''}`} 
          onClick={() => { setPage('settings'); setIsSidebarOpen(false); }}
        >
          <SettingOutlined style={{ fontSize: '18px' }} /> Cài đặt
        </button>
      </nav>

      <div className="user-pill">
        <div className="avatar">
          {user.avatar && user.avatar.length > 2 ? (
            <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            user.avatar || 'U'
          )}
        </div>
        <div className="meta">
          <span className="name">{user.name}</span>
          <span className="role">{user.dept}</span>
        </div>
        <button className="icon-btn logout-btn" onClick={() => history.push('/')}>
          <LogoutOutlined style={{ fontSize: '16px' }} />
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
