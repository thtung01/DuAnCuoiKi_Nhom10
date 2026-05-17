import React, { useState } from 'react';
import { useModel } from 'umi';
import {
  SearchOutlined,
  BellOutlined,
  BulbOutlined,
  BulbFilled,
  RightOutlined,
  CheckOutlined,
  CloseOutlined,
  ShoppingOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const NOTIF_ICON: Record<string, React.ReactNode> = {
  order:  <ShoppingOutlined />,
  stock:  <WarningOutlined />,
  system: <InfoCircleOutlined />,
};

const NOTIF_COLOR: Record<string, string> = {
  order:  'var(--green-500)',
  stock:  'var(--warn-500)',
  system: 'var(--info-500)',
};

const AdminTopbar: React.FC = () => {
  const { breadcrumbs, theme, toggleTheme } = useModel('Quản trị.global');
  const { notifs, unreadCount, markRead, markAllRead } = useModel('Quản trị.notifications');
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
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

          <button
            className={`icon-btn notif-bell ${notifOpen ? 'active' : ''} ${unreadCount > 0 && !notifOpen ? 'has-unread' : ''}`}
            onClick={() => setNotifOpen(v => !v)}
            title="Thông báo"
          >
            <BellOutlined style={{ fontSize: 20 }} />
            {unreadCount > 0 && !notifOpen && (
              <span className="notif-bell-dot" />
            )}
          </button>
        </div>
      </header>

      {notifOpen && (
        <>
          <div className="notif-overlay" onClick={() => setNotifOpen(false)} />
          <div className="notif-panel">
            <div className="notif-panel-header">
              <span className="notif-panel-title">
                Thông báo
                {unreadCount > 0 && (
                  <span className="notif-count-badge">{unreadCount}</span>
                )}
              </span>
              {unreadCount > 0 && (
                <button className="notif-mark-all" onClick={markAllRead}>
                  <CheckOutlined /> Đọc tất cả
                </button>
              )}
              <button className="notif-close" onClick={() => setNotifOpen(false)}>
                <CloseOutlined />
              </button>
            </div>

            <div className="notif-list">
              {notifs.length === 0 ? (
                <div className="notif-empty">Không có thông báo</div>
              ) : notifs.map(n => (
                <div
                  key={n.id}
                  className={`notif-item ${n.read ? 'read' : ''}`}
                  onClick={() => markRead(n.id)}
                >
                  <div
                    className="notif-icon-wrap"
                    style={{ color: NOTIF_COLOR[n.type], background: `${NOTIF_COLOR[n.type]}1a` }}
                  >
                    {NOTIF_ICON[n.type]}
                  </div>
                  <div className="notif-content">
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-desc">{n.desc}</div>
                    <div className="notif-time">{n.time} trước</div>
                  </div>
                  {!n.read && <div className="notif-dot" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminTopbar;
