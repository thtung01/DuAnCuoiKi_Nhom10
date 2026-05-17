import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import { getUser, logout } from '@/services/auth';
import './topbar.less';

const Topbar: React.FC = () => {
  const user = getUser();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className="topbar-container">
      <div className="topbar-left" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
        <div className="brand-wrapper">
          <img src="/logo.webp" alt="Logo" className="topbar-logo" />
          <div className="brand-text">
            <span className="brand-name">Căn tin</span>
            <span className="brand-slogan">Doanh nghiệp</span>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        {user ? (
          <>
            <Button
              type="text"
              onClick={() => history.push(user.role === 'admin' ? '/quan-tri' : '/trang-chinh')}
              style={{ fontWeight: 600 }}
            >
              {user.avatar} · {user.name}
            </Button>
            <Button type="default" danger onClick={handleLogout}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Button
              className="btn-login"
              type="text"
              onClick={() => history.push('/dang-nhap')}
            >
              Đăng nhập
            </Button>
            <Button
              className="btn-register"
              type="primary"
              onClick={() => history.push('/dang-ky')}
            >
              Đăng kí
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
