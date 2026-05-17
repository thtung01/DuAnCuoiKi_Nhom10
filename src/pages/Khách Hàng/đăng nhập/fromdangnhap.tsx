import React, { useState } from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';
import { login } from '@/services/auth';

const LoginForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = login(phone, password);
    if (!user) {
      message.error('Số điện thoại hoặc mật khẩu không chính xác.');
      return;
    }
    message.success(`Chào mừng ${user.name}!`);
    if (user.role === 'admin') {
      history.push('/quan-tri');
    } else {
      history.push('/trang-chinh');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <form action="#" onSubmit={(e) => e.preventDefault()}>
      <h1>Đăng nhập</h1>
      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
        Nhân viên: <b>0987654321</b> / <b>password123</b>&nbsp;&nbsp;
        Admin: <b>0000000001</b> / <b>admin123</b>
      </div>
      <a href="#" className="forgot-password">Quên mật khẩu?</a>
      <button className="submit-btn" type="button" onClick={handleLogin}>Đăng nhập</button>
      <div className="social-login">
        <span>Hoặc đăng nhập bằng</span>
        <div className="social-container">
          <a href="#" className="social-btn google" onClick={(e) => e.preventDefault()}>
            <GoogleOutlined className="icon" />
            <span className="text">Google</span>
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
