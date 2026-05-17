import React from 'react';
import { WEEK_REVENUE } from '@/services/Quản trị/Người dùng';

const WeekChart: React.FC = () => {
  const maxRev = Math.max(...WEEK_REVENUE.map(w => w.v));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 180, padding: '10px 0' }}>
      {WEEK_REVENUE.map(w => (
        <div key={w.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)' }}>{(w.v / 1000000).toFixed(1)}M</div>
          <div style={{
            width: '100%',
            height: `${(w.v / maxRev) * 140}px`,
            background: 'linear-gradient(180deg, var(--green-400), var(--green-700))',
            borderRadius: '8px 8px 4px 4px',
            minHeight: 8,
          }} />
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-1)' }}>{w.d}</div>
        </div>
      ))}
    </div>
  );
};

export default WeekChart;
