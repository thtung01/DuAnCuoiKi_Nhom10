import React from 'react';
import { Button } from 'antd';
import './topbar.less';

const Topbar: React.FC = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <div className="brand-wrapper">
          <img src="/logo.webp" alt="Logo" className="topbar-logo" />
          <div className="brand-text">
            <span className="brand-name">Căn tin</span>
            <span className="brand-slogan">Doanh nghiệp</span>
          </div>
        </div>
      </div>
      <div className="topbar-right">
        <Button className="btn-login" type="text">
          Đăng nhập
        </Button>
        <Button className="btn-register" type="primary">
          Đăng kí
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
