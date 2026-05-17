import React from 'react';
import { useModel } from 'umi';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import KPICard from './component/KPICard';
import HourlyChart from './component/HourlyChart';
import TopMonBanChay from './component/TopMonBanChay';
import DonDangXuLy from './component/DonDangXuLy';
import CanhBaoKho from './component/CanhBaoKho';
import { HOURLY_SALES, WEEK_REVENUE } from '@/services/Quản trị/Người dùng';
import './index.less';

const TongQuan: React.FC = () => {
  const { orders } = useModel('Quản trị.kitchen');
  const { inventory } = useModel('Quản trị.inventory');

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? Math.round(revenue / orders.length) : 0;
  const lowStock = inventory.filter(i => i.stock < i.threshold).length;

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
  });

  return (
    <div className="tong-quan-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tổng quan vận hành</h1>
          <p className="page-subtitle">Hôm nay · {today}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary"><DownloadOutlined /> Xuất báo cáo</button>
          <button className="btn btn-primary"><PlusOutlined /> Thực đơn mới</button>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        <KPICard label="Doanh thu hôm nay"  value={`${(revenue / 1000000).toFixed(2)}M`} unit="đ" delta="+12.4%" deltaDir="up"   sparkData={WEEK_REVENUE.map(w => w.v)} />
        <KPICard label="Đơn hàng"            value={orders.length}                         delta="+8"     deltaDir="up"   sparkData={HOURLY_SALES.map(h => h.v)} />
        <KPICard label="Trung bình / Đơn"    value={`${(avgOrder / 1000).toFixed(0)}K`}   unit="đ"       delta="-3%"    deltaDir="down" sparkData={[42,45,48,46,49,52,50]} />
        <KPICard label="Cảnh báo kho"        value={lowStock}                               unit=" mặt hàng" delta="cần đặt thêm" deltaDir="" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-title">Đơn theo giờ <span className="muted">· hôm nay</span></div>
          <HourlyChart data={HOURLY_SALES} />
        </div>
        <div className="card">
          <div className="card-title">🔥 Top món bán chạy <span className="muted">· hôm nay</span></div>
          <TopMonBanChay />
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-title">Đơn đang xử lý <span className="muted">· real-time</span></div>
          <DonDangXuLy />
        </div>
        <div className="card">
          <div className="card-title">Cảnh báo nguyên liệu</div>
          <CanhBaoKho />
        </div>
      </div>
    </div>
  );
};

export default TongQuan;
