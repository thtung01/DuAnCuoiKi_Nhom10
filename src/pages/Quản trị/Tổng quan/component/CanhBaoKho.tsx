import React from 'react';
import { useModel } from 'umi';
import { WarningOutlined } from '@ant-design/icons';

const CanhBaoKho: React.FC = () => {
  const { inventory } = useModel('Quản trị.inventory');
  const lowStock = inventory.filter(i => i.stock < i.threshold);

  if (lowStock.length === 0) return null;

  return (
    <div className="canh-bao-kho">
      {lowStock.map(item => {
        const pct = Math.round((item.stock / item.threshold) * 100);
        const isCritical = item.stock < item.threshold * 0.5;
        return (
          <div key={item.id} className={`inv-bar ${isCritical ? 'critical' : ''}`}>
            <div className="inv-bar-header">
              <span>{item.emoji} {item.name}</span>
              <span className={`chip ${isCritical ? 'err' : 'warn'}`}>
                <WarningOutlined style={{ marginRight: 4 }} />
                {item.stock}/{item.threshold} {item.unit}
              </span>
            </div>
            <div className="inv-bar-track">
              <div
                className={`inv-bar-fill ${isCritical ? 'err' : 'warn'}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CanhBaoKho;
