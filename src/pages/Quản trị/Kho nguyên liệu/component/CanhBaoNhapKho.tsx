import React from 'react';
import { WarningOutlined, PlusOutlined } from '@ant-design/icons';
import { InventoryItem } from '@/services/Quản trị/typing';

const CanhBaoNhapKho: React.FC<{ lowStock: InventoryItem[] }> = ({ lowStock }) => {
  if (lowStock.length === 0) return null;
  return (
    <div className="canh-bao-nhap-kho">
      <div className="icon-wrap">
        <WarningOutlined style={{ fontSize: 18, color: 'white' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Cần đặt thêm {lowStock.length} mặt hàng</div>
        <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>
          {lowStock.map(i => `${i.emoji} ${i.name}`).join(' · ')}
        </div>
      </div>
      <button className="btn btn-primary btn-sm"><PlusOutlined /> Tạo đơn nhập</button>
    </div>
  );
};

export default CanhBaoNhapKho;
