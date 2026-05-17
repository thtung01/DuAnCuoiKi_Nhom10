import React from 'react';
import { useModel } from 'umi';
import {
  SearchOutlined,
  BellOutlined,
  BulbOutlined,
  BulbFilled,
  RightOutlined,
} from '@ant-design/icons';

const AdminTopbar: React.FC = () => {
  const { breadcrumbs, theme, toggleTheme } = useModel('Quản trị.global');

  return (
    <header className="topbar">
      <div className="crumbs">
        {breadcrumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <RightOutlined style={{ fontSize: 12 }} />}
            {i === breadcrumbs.length - 1 ? <strong>{c}</strong> : <span>{c}</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="search">
        <SearchOutlined style={{ fontSize: 14 }} />
        <input placeholder="Tìm món, đơn, người dùng…" />
        <kbd>⌘K</kbd>
      </div>

      <div className="topbar-actions">
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
        >
          {theme === 'dark'
            ? <BulbFilled style={{ fontSize: 16 }} />
            : <BulbOutlined style={{ fontSize: 16 }} />}
        </button>
        <button className="icon-btn">
          <BellOutlined style={{ fontSize: 16 }} />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
