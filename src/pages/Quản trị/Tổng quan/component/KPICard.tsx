import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { KPICardProps } from '@/services/Quản trị/typing';

const KPICard: React.FC<KPICardProps> = ({ label, value, unit, delta, deltaDir, sparkData }) => {
  const max = sparkData ? Math.max(...sparkData) : 0;
  const min = sparkData ? Math.min(...sparkData) : 0;
  const points = sparkData
    ? sparkData
        .map((v, i) => {
          const x = (i / (sparkData.length - 1)) * 100;
          const y = 30 - ((v - min) / (max - min || 1)) * 28 - 1;
          return `${x},${y}`;
        })
        .join(' ')
    : '';

  return (
    <div className="card kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {delta && (
          <div className={`kpi-delta ${deltaDir}`}>
            {deltaDir === 'up' && <ArrowUpOutlined />}
            {deltaDir === 'down' && <ArrowDownOutlined />}
            {delta}
          </div>
        )}
        {sparkData && sparkData.length > 1 && (
          <svg
            className="spark"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            style={{ flex: 1, height: 30 }}
          >
            <polyline
              fill="none"
              stroke={deltaDir === 'down' ? 'var(--err-500)' : 'var(--accent)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default KPICard;
