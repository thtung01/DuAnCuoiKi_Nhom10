import React, { useState } from 'react';
import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import DanhSachMon from './component/danhsachmon';
import CartOption from './component/cartoption';
import ThanhToan from './component/thanhtoan';
import CartFooter from './component/cartfooter';
import { Voucher } from '@/services/Khách hàng/Giỏ hàng/Cart Option/typing';
import './index.less';

const GioHang: React.FC = () => {
    // ── State toàn cục từ model ───────────────────────────────────────────────
    const { cart, cartOpen, setCartOpen } = useModel('Khách Hàng.Thực đơn.index');

    // ── State cục bộ của giỏ hàng ─────────────────────────────────────────────
    const [note, setNote] = useState('');
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | undefined>(undefined);
    const [payment, setPayment] = useState('cash');
    const [isLoading, setIsLoading] = useState(false);

    const cartQty = cart.reduce((s: number, i: any) => s + i.qty, 0);
    const subtotal = cart.reduce((s: number, i: any) => s + i.price * i.qty, 0);

    // ── Xác nhận đặt món ──────────────────────────────────────────────────────
    const handleConfirm = () => {
        setIsLoading(true);
        // TODO: gọi API đặt món thực tế
        setTimeout(() => {
            setIsLoading(false);
            setCartOpen(false);
        }, 1500);
    };

    return (
        <>
            {/* ── Overlay backdrop ─────────────────────────────────────────── */}
            <div
                className={`cart-overlay ${cartOpen ? 'visible' : ''}`}
                onClick={() => setCartOpen(false)}
                aria-hidden="true"
            />

            {/* ── Drawer giỏ hàng ──────────────────────────────────────────── */}
            <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Giỏ hàng">
                {/* Header */}
                <div className="cart-drawer-header">
                    <div className="cart-drawer-title">
                        <ShoppingCartOutlined />
                        <span>Giỏ hàng</span>
                        {cartQty > 0 && (
                            <span className="cart-badge">{cartQty}</span>
                        )}
                    </div>
                    <button
                        id="btn-close-cart"
                        className="cart-close-btn"
                        onClick={() => setCartOpen(false)}
                        aria-label="Đóng giỏ hàng"
                    >
                        <CloseOutlined />
                    </button>
                </div>

                {/* Nội dung cuộn được */}
                <div className="cart-drawer-body">
                    {/* 1. Danh sách món */}
                    <section className="cart-section">
                        <DanhSachMon />
                    </section>

                    {/* 2. Tuỳ chọn (giờ nhận, voucher, ghi chú) */}
                    <section className="cart-section">
                        <CartOption
                            note={note}
                            onChangeNote={setNote}
                            selectedVoucher={selectedVoucher}
                            onSelectVoucher={setSelectedVoucher}
                            subtotal={subtotal}
                        />
                    </section>

                    {/* 3. Phương thức thanh toán */}
                    <section className="cart-section">
                        <ThanhToan payment={payment} onSelect={setPayment} />
                    </section>
                </div>

                {/* Footer cố định: giá + nút xác nhận */}
                <div className="cart-drawer-footer">
                    <CartFooter
                        selectedVoucher={selectedVoucher}
                        onConfirm={handleConfirm}
                        isLoading={isLoading}
                    />
                </div>
            </aside>
        </>
    );
};

export default GioHang;
