import React from 'react';
import {
    RightOutlined,
    SearchOutlined,
    BulbOutlined,
    BulbFilled,
    BellOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import './index.less';
import { useModel } from 'umi';
import { ThemeType } from '@/services/Khách hàng/Component/topbar/typing';

const Topbar: React.FC = () => {
    const { theme, toggleTheme, breadcrumbs } = useModel('Khách Hàng.global');
    const { cart, setCartOpen } = useModel('Khách Hàng.Thực đơn.index');
    const { role } = useModel('Khách Hàng.user');
    const { unreadCount, setIsNotificationOpen } = useModel('Khách Hàng.Notifications');

    const cartCount = role === 'employee' ? cart.length : undefined;

    return (
        <header className="topbar" style={{ position: 'relative' }}>
            <div className="crumbs">
                {breadcrumbs.map((c: string, i: number) => (
                    <React.Fragment key={i}>
                        {i > 0 && <RightOutlined style={{ fontSize: '12px' }} />}
                        {i === breadcrumbs.length - 1 ? <strong>{c}</strong> : <span>{c}</span>}
                    </React.Fragment>
                ))}
            </div>

            <div className="search">
                <SearchOutlined style={{ fontSize: '14px', color: 'var(--ink-3)' }} />
                <input placeholder="Tìm món, đơn, người dùng…" />
            </div>

            <div className="topbar-actions">
                <button className="icon-btn" onClick={toggleTheme} title={theme === ThemeType.DARK ? 'Chế độ sáng' : 'Chế độ tối'}>
                    {theme === ThemeType.DARK ? <BulbFilled style={{ fontSize: '16px' }} /> : <BulbOutlined style={{ fontSize: '16px' }} />}
                </button>

                <button className="icon-btn" onClick={() => setIsNotificationOpen(true)}>
                    <BellOutlined style={{ fontSize: '16px' }} />
                    {unreadCount > 0 && <span className="dot" />}
                </button>

                {cartCount !== undefined && (
                    <button className="btn btn-secondary cart-btn" onClick={() => setCartOpen(true)}>
                        <ShoppingCartOutlined style={{ fontSize: '14px' }} />
                        Giỏ
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Topbar;
