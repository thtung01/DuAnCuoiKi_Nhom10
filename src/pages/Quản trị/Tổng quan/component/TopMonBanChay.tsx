import React, { useMemo } from 'react';
import { useModel } from 'umi';

const TopMonBanChay: React.FC = () => {
  const { orders } = useModel('Quản trị.kitchen');
  const { menu } = useModel('Quản trị.menu');

  const popular = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => o.items.forEach(it => {
      counts[it.id] = (counts[it.id] || 0) + it.qty;
    }));
    return menu
      .map(m => ({ ...m, soldToday: counts[m.id] || 0 }))
      .sort((a, b) => (b.soldToday || b.sold) - (a.soldToday || a.sold))
      .slice(0, 5);
  }, [orders, menu]);

  return (
    <div className="top-mon-list">
      {popular.map((m, i) => (
        <div key={m.id} className="top-mon-row">
          <div className={`rank-badge ${i === 0 ? 'rank-first' : ''}`}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <span style={{ fontSize: 20 }}>{m.emoji}</span>
          <div className="top-mon-info">
            <div className="top-mon-name">{m.name}</div>
            <div className="top-mon-bar">
              <div
                className="top-mon-fill"
                style={{ width: `${((m.sold) / (popular[0]?.sold || 1)) * 100}%` }}
              />
            </div>
          </div>
          <div className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{m.sold}</div>
        </div>
      ))}
    </div>
  );
};

export default TopMonBanChay;
