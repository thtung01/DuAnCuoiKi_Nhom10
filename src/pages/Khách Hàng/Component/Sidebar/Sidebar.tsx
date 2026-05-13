import React from 'react';
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './Sidebar.less';
import { NAV_EMPLOYEE, defaultUser } from '@/services/Khách hàng/Sidebar';
import { useModel } from 'umi';

const Sidebar: React.FC = () => {
  const { page, setPage } = useModel('Khách Hàng.global');
  const { role, setRole, currentUser } = useModel('Khách Hàng.user');
  const { cart } = useModel('Khách Hàng.Thực đơn.index');

  const user = currentUser || defaultUser;

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo.webp" alt="Logo" className="brand-logo" />
        <div className="brand-text">
          <div className="brand-name">Căn tin</div>
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
              onClick={() => setPage(item.id)}
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
        <button className="nav-item">
          <BellOutlined style={{ fontSize: '18px' }} /> Thông báo
        </button>
        <button className="nav-item">
          <SettingOutlined style={{ fontSize: '18px' }} /> Cài đặt
        </button>
      </nav>

      <div className="user-pill">
        <div className="avatar">{user.avatar}</div>
        <div className="meta">
          <span className="name">{user.name}</span>
          <span className="role">{user.dept}</span>
        </div>
        <button className="icon-btn logout-btn">
          <LogoutOutlined style={{ fontSize: '16px' }} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
