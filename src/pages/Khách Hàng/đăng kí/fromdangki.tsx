import React, { useState } from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';

interface RegisterFormProps {
    onToggle?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggle }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (!phone || !password) {
            message.warning('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        
        // Giả định đăng ký thành công
        message.success('Tạo tài khoản thành công! Bạn có thể đăng nhập ngay.');
        // Thường thì sẽ chuyển sang màn hình đăng nhập hoặc tự động đăng nhập
        // Ở đây ta có thể trigger chuyển tab hoặc reload
        setTimeout(() => {
            window.location.reload(); // Để quay lại màn đăng nhập (vì logic toggle ở component cha)
        }, 1500);
    };

    return (
        <form action="#" onSubmit={(e) => e.preventDefault()}>
            <h1>Tạo tài khoản</h1>
            <input 
                type="text" 
                placeholder="Số điện thoại" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Mật khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="submit-btn" type="button" onClick={handleRegister}>Đăng ký</button>
            <div className="social-login">
                <span>Hoặc đăng ký bằng</span>
                <div className="social-container">
                    <a href="#" className="social-btn google" onClick={(e) => e.preventDefault()}>
                        <GoogleOutlined className="icon" />
                        <span className="text">Google</span>
                    </a>
                </div>
            </div>
            <div className="mobile-toggle">
                Đã có tài khoản? <span onClick={onToggle}>Đăng nhập ngay</span>
            </div>
        </form>
    );
};

export default RegisterForm;
