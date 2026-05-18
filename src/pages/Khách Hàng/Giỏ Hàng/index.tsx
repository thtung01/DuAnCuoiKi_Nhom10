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
    const { cart, cartOpen, setCartOpen, clearCart } = useModel('Khách Hàng.Thực đơn.index');
    const { addOrder } = useModel('Khách Hàng.Orders');
    const { setPage } = useModel('Khách Hàng.global');

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
        
        setTimeout(() => {
            const SERVICE_FEE_RATE = 0.05;
            const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
            const discount = (() => {
                if (!selectedVoucher) return 0;
                if (selectedVoucher.minOrder && subtotal < selectedVoucher.minOrder) return 0;
                return selectedVoucher.discount;
            })();
            const total = Math.max(0, subtotal + serviceFee - discount);

            const newOrder = {
                id: `BU-${Math.floor(Math.random() * 9000) + 1000}`,
                user: 'u1',
                userName: 'Khách Hàng',
                dept: 'Guest',
                items: cart.map((it: any) => ({
                    id: it.id,
                    name: it.name,
                    qty: it.qty,
                    price: it.price
                })),
                total: total,
                status: 'pending',
                payment: payment,
                created: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                pickup: '15 phút nữa',
                note: note
            };

            addOrder(newOrder);
            clearCart();
            setNote('');
            setSelectedVoucher(undefined);
            
            setIsLoading(false);
            setCartOpen(false);
            setPage('history');
        }, 1000);
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
