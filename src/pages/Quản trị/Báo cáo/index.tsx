import React from 'react';
import { useModel } from 'umi';
import { DownloadOutlined } from '@ant-design/icons';
import KPICard from '../Tổng quan/component/KPICard';
import WeekChart from './component/WeekChart';
import PaymentPie from './component/PaymentPie';
import Heatmap from './component/Heatmap';
import { WEEK_REVENUE } from '@/services/Quản trị/Người dùng';
import { MENU_CATEGORIES } from '@/services/Khách hàng/Thực đơn';
import './index.less';

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const BaoCao: React.FC = () => {
  const { menu } = useModel('Quản trị.menu');

  const totalRevenue = WEEK_REVENUE.reduce((s, w) => s + w.v, 0);
  const popular = [...menu]
    .map(m => ({ ...m, revenue: m.sold * m.price }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);

  return (
    <div className="bao-cao-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Báo cáo & thống kê</h1>
          <p className="page-subtitle">Phân tích doanh thu, đơn hàng và món ăn phổ biến theo thời gian.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="seg-radio">
            <button className="active">Tuần này</button>
            <button>Tháng</button>
            <button>Quý</button>
          </div>
          <button className="btn btn-secondary"><DownloadOutlined /> Xuất Excel</button>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        <KPICard label="Doanh thu tuần"  value={`${(totalRevenue / 1000000).toFixed(1)}M`} unit="đ" delta="+18.2%" deltaDir="up" sparkData={WEEK_REVENUE.map(w => w.v)} />
        <KPICard label="Tổng đơn"        value="687" delta="+42"  deltaDir="up" sparkData={[82,98,94,124,142,86,61]} />
        <KPICard label="Khách hoạt động" value="234" delta="+8%"  deltaDir="up" />
        <KPICard label="Tỉ lệ huỷ"       value="1.4" unit="%" delta="-0.3%" deltaDir="up" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-title">Doanh thu theo ngày <span className="muted">· tuần này</span></div>
          <WeekChart />
        </div>
        <div className="card">
          <div className="card-title">Phân bổ thanh toán <span className="muted">· tuần này</span></div>
          <PaymentPie />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">🔥 Khung giờ cao điểm <span className="muted">· đơn theo giờ và ngày trong tuần</span></div>
        <Heatmap />
      </div>

      <div className="card">
        <div className="card-title">Top món theo doanh thu</div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 30 }}>#</th>
              <th>Món</th>
              <th>Danh mục</th>
              <th style={{ textAlign: 'right' }}>Đã bán</th>
              <th style={{ textAlign: 'right' }}>Doanh thu</th>
              <th>Phổ biến</th>
            </tr>
          </thead>
          <tbody>
            {popular.map((m, i) => (
              <tr key={m.id}>
                <td className="mono" style={{ color: 'var(--ink-3)', fontWeight: 700 }}>
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{m.emoji}</span>
                    <span style={{ fontWeight: 600 }}>{m.name}</span>
                  </div>
                </td>
                <td>
                  <span className="chip outline">
                    {MENU_CATEGORIES.find(c => c.id === m.cat)?.name}
                  </span>
                </td>
                <td className="num">{m.sold}</td>
                <td className="num">{formatVND(m.revenue)}đ</td>
                <td>
                  <div style={{ height: 5, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden', width: 120 }}>
                    <div style={{ height: '100%', background: 'var(--accent)', width: `${(m.revenue / popular[0].revenue) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BaoCao;
