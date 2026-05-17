import React from 'react';
import { useModel } from 'umi';
import { ORDER_STATUSES } from '@/services/Khách hàng/Orders/typing';

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const DonDangXuLy: React.FC = () => {
  const { orders } = useModel('Quản trị.kitchen');
  const active = orders.filter(o => o.status !== 'done').slice(0, 5);

  return (
    <div className="don-dang-xu-ly">
      {active.map(o => {
        const st = ORDER_STATUSES[o.status];
        return (
          <div key={o.id} className="don-row">
            <span className={`dot-status ${st.color} dot-pulse`} style={{ width: 8, height: 8 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>
                {o.userName}
                <span style={{ color: 'var(--ink-3)', fontWeight: 400, marginLeft: 6, fontSize: 11 }}>
                  · {o.dept}
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                <span className="mono">{o.id}</span> · {o.items.length} món · nhận {o.pickup}
              </div>
            </div>
            <span className={`chip ${st.color}`}>{st.label}</span>
            <div className="mono" style={{ fontSize: 13, fontWeight: 600, minWidth: 80, textAlign: 'right' }}>
              {formatVND(o.total)}đ
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DonDangXuLy;
