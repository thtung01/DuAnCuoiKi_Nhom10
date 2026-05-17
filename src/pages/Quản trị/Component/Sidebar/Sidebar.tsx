import React from 'react';
import { useModel } from 'umi';
import { history } from 'umi';
import {
  HomeOutlined,
  ContainerOutlined,
  UnorderedListOutlined,
  InboxOutlined,
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { AdminPage } from '@/services/Quản trị/typing';
import { logout, getUser } from '@/services/auth';

interface NavItem {
  id: AdminPage;
  label: string;
  icon: React.ReactNode;
}

const NAV_ADMIN: NavItem[] = [
  { id: 'dashboard',  label: 'Tổng quan',      icon: <HomeOutlined /> },
  { id: 'kitchen',    label: 'Bảng đơn bếp',   icon: <ContainerOutlined /> },
  { id: 'menu-mgmt',  label: 'Thực đơn',        icon: <UnorderedListOutlined /> },
  { id: 'inventory',  label: 'Kho nguyên liệu', icon: <InboxOutlined /> },
  { id: 'users',      label: 'Người dùng',      icon: <TeamOutlined /> },
];

const AdminSidebar: React.FC = () => {
  const { page, setPage } = useModel('Quản trị.global');
  const { orders } = useModel('Quản trị.kitchen');
  const { inventory } = useModel('Quản trị.inventory');

  const pendingCount  = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = inventory.filter(i => i.stock < i.threshold).length;

  const authUser = getUser();
  const displayUser = authUser
    ? { avatar: authUser.avatar, name: authUser.name, dept: authUser.dept }
    : { avatar: 'LN', name: 'Lê Hoàng Nam', dept: 'Quản trị' };

  const getBadge = (id: AdminPage): number => {
    if (id === 'kitchen')   return pendingCount;
    if (id === 'inventory') return lowStockCount;
    return 0;
  };

  const handleLogout = () => { logout(); history.push('/'); };

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo.webp" alt="Logo" className="brand-logo" />
        <div className="brand-text">
          <div className="brand-name">Căn tin</div>
          <div className="brand-sub">Quản trị</div>
        </div>
      </div>

      <nav className="nav-section">
        <div className="nav-label">Vận hành</div>
        {NAV_ADMIN.map(item => {
          const badge = getBadge(item.id);
          const isWarn = item.id === 'inventory' && lowStockCount > 0;
          return (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''} ${isWarn ? 'warn' : ''}`}
              onClick={() => setPage(item.id)}
            >
              {item.icon}
              {item.label}
              {badge > 0 && <span className="badge">{badge}</span>}
            </button>
          );
        })}
      </nav>

      <nav className="nav-section">
        <div className="nav-label">Khác</div>
        <button className="nav-item">
          <SettingOutlined /> Cài đặt
        </button>
      </nav>

      <div className="user-pill">
        <div className="avatar">{displayUser.avatar}</div>
        <div className="meta">
          <span className="name">{displayUser.name}</span>
          <span className="role">{displayUser.dept}</span>
        </div>
        <button className="icon-btn logout-btn" title="Đăng xuất" onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: 14 }} />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
