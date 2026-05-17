import React from 'react';
import { useModel } from 'umi';
import { UploadOutlined, CarOutlined, SearchOutlined } from '@ant-design/icons';
import KPICard from '../Tổng quan/component/KPICard';
import InvRow from './component/InvRow';
import CanhBaoNhapKho from './component/CanhBaoNhapKho';
import './index.less';

const KhoNguyenLieu: React.FC = () => {
  const { inventory, search, setSearch } = useModel('Quản trị.inventory');

  const visible = inventory.filter(i =>
    !search || i.name.toLowerCase().includes(search.toLowerCase()),
  );
  const lowStock = inventory.filter(i => i.stock < i.threshold);
  const totalValue = inventory.reduce((s, i) => s + i.stock * i.cost, 0);

  return (
    <div className="kho-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Kho nguyên liệu</h1>
          <p className="page-subtitle">Theo dõi tồn kho, ngưỡng cảnh báo và đề xuất đặt hàng.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary"><UploadOutlined /> Nhập kho</button>
          <button className="btn btn-primary"><CarOutlined /> Đặt hàng NCC</button>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        <KPICard label="Tổng giá trị kho"   value={`${(totalValue / 1000000).toFixed(1)}M`} unit="đ" />
        <KPICard label="Mặt hàng"            value={inventory.length} />
        <KPICard label="Cảnh báo"            value={lowStock.length} delta="cần đặt" deltaDir="" />
        <KPICard label="Đơn nhập tuần này"   value="6" delta="2 chờ giao" deltaDir="" />
      </div>

      <CanhBaoNhapKho lowStock={lowStock} />

      <div className="card" style={{ padding: 0, marginTop: lowStock.length > 0 ? 16 : 0 }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search" style={{ maxWidth: 300, margin: 0 }}>
            <SearchOutlined style={{ fontSize: 14 }} />
            <input placeholder="Tìm nguyên liệu…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-3)' }}>{visible.length} mặt hàng</span>
        </div>
        <div style={{ padding: '8px 18px' }}>
          {visible.map(i => <InvRow key={i.id} item={i} />)}
        </div>
      </div>
    </div>
  );
};

export default KhoNguyenLieu;
