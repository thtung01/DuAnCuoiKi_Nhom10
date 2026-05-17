import React from 'react';
import { InventoryItem } from '@/services/Quản trị/typing';

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const InvRow: React.FC<{ item: InventoryItem }> = ({ item: i }) => {
  const pct = Math.min(100, (i.stock / i.max) * 100);
  const tier = i.stock < i.threshold ? 'err' : i.stock < i.threshold * 1.2 ? 'warn' : '';
  const tierLabel = tier === 'err' ? 'Sắp hết' : tier === 'warn' ? 'Còn ít' : 'Đủ';

  return (
    <div className="inv-row">
      <div className="inv-icon">{i.emoji}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{i.name}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{i.supplier} · {formatVND(i.cost)}đ/{i.unit}</div>
      </div>
      <div className="mono" style={{ fontWeight: 700, fontSize: 14 }}>
        {i.stock}<span style={{ color: 'var(--ink-3)', fontWeight: 500, fontSize: 11 }}> {i.unit}</span>
      </div>
      <div className="inv-bar">
        <div className={`fill ${tier}`} style={{ width: `${pct}%` }} />
        <div className="threshold" style={{ left: `${(i.threshold / i.max) * 100}%` }} />
      </div>
      <span className={`chip ${tier === 'err' ? 'err' : tier === 'warn' ? 'warn' : 'green'}`}>
        <span className={`dot-status ${tier === 'err' ? 'err' : tier === 'warn' ? 'warn' : 'green'}`} />
        {tierLabel}
      </span>
      <button className="btn btn-secondary btn-sm" style={{ justifySelf: 'end' }}>+ Nhập</button>
    </div>
  );
};

export default InvRow;
