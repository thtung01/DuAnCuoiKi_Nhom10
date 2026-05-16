import React, { useState, useEffect } from 'react';
import {
    ClockCircleOutlined,
    EditOutlined,
    TagOutlined,
    CheckCircleFilled,
    RightOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useModel } from 'umi';
import { CartOptionProps, SEED_VOUCHERS } from '@/services/Khách hàng/Giỏ hàng/Cart Option/typing';
import { SEED_MENU } from '@/services/Khách hàng/Thực đơn';
import '../cartoption.less';

// ─── Tính giờ nhận tự động ────────────────────────────────────────────────────
// Logic: giờ hiện tại + prep_time_tối_đa_trong_giỏ + 5 phút buffer
const BUFFER_MIN = 5;

function calcPickupTime(cart: any[]): { timeStr: string; prepMin: number } {
    if (cart.length === 0) return { timeStr: '--:--', prepMin: 0 };

    const maxPrep = cart.reduce((max: number, item: any) => {
        const dish = SEED_MENU.find(d => d.id === item.id);
        return Math.max(max, dish?.prep ?? 0);
    }, 0);

    const totalMin = maxPrep + BUFFER_MIN;
    const ready = new Date(Date.now() + totalMin * 60 * 1000);

    const timeStr = ready.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return { timeStr, prepMin: totalMin };
}

// ─── Component ────────────────────────────────────────────────────────────────
const CartOption: React.FC<CartOptionProps> = ({
    note,
    onChangeNote,
    selectedVoucher,
    onSelectVoucher,
}) => {
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const { cart } = useModel('Khách Hàng.Thực đơn.index');

    // Tính giờ nhận — cập nhật mỗi khi giỏ thay đổi hoặc mỗi phút
    const [pickup, setPickup] = useState(() => calcPickupTime(cart));

    useEffect(() => {
        setPickup(calcPickupTime(cart));
        const timer = setInterval(() => setPickup(calcPickupTime(cart)), 60000);
        return () => clearInterval(timer);
    }, [cart]);

    return (
        <div className="cart-options-container">
            {/* 1. Giờ nhận món — chỉ đọc, do hệ thống tính */}
            <div className="option-section">
                <div className="section-header">
                    <ClockCircleOutlined />
                    <span>Giờ nhận món (dự kiến)</span>
                </div>
                <div className="pickup-time-display">
                    <div className="pickup-time-value">
                        <ThunderboltOutlined className="pickup-icon" />
                        <span className="pickup-hhmm">{pickup.timeStr}</span>
                    </div>
                    {pickup.prepMin > 0 && (
                        <span className="pickup-note">
                            Khoảng {pickup.prepMin} phút kể từ lúc đặt
                        </span>
                    )}
                </div>
            </div>

            {/* 2. Voucher */}
            <div className="option-section">
                <div className="section-header">
                    <TagOutlined />
                    <span>Voucher giảm giá</span>
                </div>
                <div
                    className={`voucher-selector ${selectedVoucher ? 'has-value' : ''}`}
                    onClick={() => setIsVoucherModalOpen(true)}
                >
                    {selectedVoucher ? (
                        <div className="selected-info">
                            <CheckCircleFilled className="success-icon" />
                            <div className="text">
                                <strong>{selectedVoucher.code}</strong>
                                <span>- Đã áp dụng giảm {selectedVoucher.discount.toLocaleString()}đ</span>
                            </div>
                        </div>
                    ) : (
                        <div className="placeholder">
                            <span>Chọn hoặc nhập mã giảm giá</span>
                        </div>
                    )}
                    <RightOutlined className="arrow" />
                </div>
            </div>

            {/* 3. Ghi chú */}
            <div className="option-section">
                <div className="section-header">
                    <EditOutlined />
                    <span>Ghi chú cho bếp</span>
                </div>
                <textarea
                    className="note-textarea"
                    placeholder="Vd: Ít cay, không hành, thêm cơm..."
                    value={note}
                    onChange={(e) => onChangeNote(e.target.value)}
                    rows={2}
                />
            </div>

            {/* Modal danh sách Voucher */}
            <Modal
                title="Chọn Voucher"
                open={isVoucherModalOpen}
                onCancel={() => setIsVoucherModalOpen(false)}
                footer={null}
                width={400}
                className="voucher-modal"
            >
                <div className="voucher-list">
                    {SEED_VOUCHERS.map(v => (
                        <div
                            key={v.id}
                            className={`voucher-item ${selectedVoucher?.id === v.id ? 'active' : ''}`}
                            onClick={() => {
                                onSelectVoucher(v);
                                setIsVoucherModalOpen(false);
                            }}
                        >
                            <div className="v-icon">
                                <TagOutlined />
                            </div>
                            <div className="v-content">
                                <div className="v-code">{v.code}</div>
                                <div className="v-desc">{v.desc}</div>
                            </div>
                            {selectedVoucher?.id === v.id && <CheckCircleFilled className="v-check" />}
                        </div>
                    ))}
                    {selectedVoucher && (
                        <button
                            className="remove-voucher-btn"
                            onClick={() => {
                                onSelectVoucher(undefined);
                                setIsVoucherModalOpen(false);
                            }}
                        >
                            Bỏ chọn Voucher
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default CartOption;
