import React from 'react';
import { useModel } from 'umi';
import {
  HomeOutlined,
  ContainerOutlined,
  UnorderedListOutlined,
  InboxOutlined,
  TeamOutlined,
  BarChartOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { AdminPage } from '@/services/Quản trị/typing';
import { SEED_USERS } from '@/services/Quản trị/Người dùng';

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
  { id: 'reports',    label: 'Báo cáo',         icon: <BarChartOutlined /> },
];

const AdminSidebar: React.FC = () => {
  const { page, setPage } = useModel('Quản trị.global');
  const { orders } = useModel('Quản trị.kitchen');
  const { inventory } = useModel('Quản trị.inventory');

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = inventory.filter(i => i.stock < i.threshold).length;
  const adminUser = SEED_USERS.find(u => u.role === 'admin') ?? SEED_USERS[0];

  const getBadge = (id: AdminPage): number => {
    if (id === 'kitchen') return pendingCount;
    if (id === 'inventory') return lowStockCount;
    return 0;
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">B</div>
        <div>
          <div className="brand-name">Bữa</div>
          <div className="brand-sub">Canteen OS</div>
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
        <div className="avatar">{adminUser.avatar}</div>
        <div className="meta">
          <span className="name">{adminUser.name}</span>
          <span className="role">{adminUser.dept}</span>
        </div>
        <button className="icon-btn" style={{ width: 28, height: 28 }}>
          <LogoutOutlined style={{ fontSize: 14 }} />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
