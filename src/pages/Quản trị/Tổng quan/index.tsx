import React, { useState } from 'react';
import { useModel } from 'umi';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import KPICard from './component/KPICard';
import HourlyChart from './component/HourlyChart';
import RevenueChart from './component/RevenueChart';
import TopMonBanChay from './component/TopMonBanChay';
import DonDangXuLy from './component/DonDangXuLy';
import CanhBaoKho from './component/CanhBaoKho';
import WeekChart from '../Báo cáo/component/WeekChart';
import PaymentPie from '../Báo cáo/component/PaymentPie';
import Heatmap from '../Báo cáo/component/Heatmap';
import { HOURLY_SALES, WEEK_REVENUE, MONTH_REVENUE, QUARTER_REVENUE } from '@/services/Quản trị/Người dùng';
import './index.less';

const TongQuan: React.FC = () => {
  const { orders } = useModel('Quản trị.kitchen');
  const { inventory } = useModel('Quản trị.inventory');
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'quarter'>('today');

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? Math.round(revenue / orders.length) : 0;
  const lowStock = inventory.filter(i => i.stock < i.threshold).length;
  const weekRevenue    = WEEK_REVENUE.reduce((s, w) => s + w.v, 0);
  const monthRevenue   = MONTH_REVENUE.reduce((s, w) => s + w.v, 0);
  const quarterRevenue = QUARTER_REVENUE.reduce((s, w) => s + w.v, 0);

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
  });

  return (
    <div className="tong-quan-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Tổng quan vận hành</h1>
          <p className="page-subtitle">{today}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="seg-radio">
            <button className={period === 'today'   ? 'active' : ''} onClick={() => setPeriod('today')}>Hôm nay</button>
            <button className={period === 'week'    ? 'active' : ''} onClick={() => setPeriod('week')}>Tuần</button>
            <button className={period === 'month'   ? 'active' : ''} onClick={() => setPeriod('month')}>Tháng</button>
            <button className={period === 'quarter' ? 'active' : ''} onClick={() => setPeriod('quarter')}>Quý</button>
          </div>
          <button className="btn btn-secondary"><DownloadOutlined /> Xuất báo cáo</button>
          <button className="btn btn-primary"><PlusOutlined /> Thực đơn mới</button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        {period === 'today' && <>
          <KPICard label="Doanh thu hôm nay"  value={`${(revenue / 1000000).toFixed(2)}M`}           unit="đ"          delta="+12.4%" deltaDir="up"   sparkData={WEEK_REVENUE.map(w => w.v)} />
          <KPICard label="Đơn hàng"            value={orders.length}                                  delta="+8"        deltaDir="up"   sparkData={HOURLY_SALES.map(h => h.v)} />
          <KPICard label="Trung bình / Đơn"    value={`${(avgOrder / 1000).toFixed(0)}K`}             unit="đ"          delta="-3%"     deltaDir="down" sparkData={[42,45,48,46,49,52,50]} />
          <KPICard label="Cảnh báo kho"        value={lowStock}                                        unit=" mặt hàng"  delta="cần đặt thêm" deltaDir="" />
        </>}
        {period === 'week' && <>
          <KPICard label="Doanh thu tuần"      value={`${(weekRevenue / 1000000).toFixed(1)}M`}       unit="đ"          delta="+18.2%" deltaDir="up"   sparkData={WEEK_REVENUE.map(w => w.v)} />
          <KPICard label="Tổng đơn"            value="687"                                             delta="+42"       deltaDir="up"   sparkData={[82,98,94,124,142,86,61]} />
          <KPICard label="Khách hoạt động"     value="234"                                             delta="+8%"       deltaDir="up" />
          <KPICard label="Tỉ lệ huỷ"           value="1.4"                                             unit="%"          delta="-0.3%"   deltaDir="up" />
        </>}
        {period === 'month' && <>
          <KPICard label="Doanh thu tháng"     value={`${(monthRevenue / 1000000).toFixed(0)}M`}      unit="đ"          delta="+14.8%" deltaDir="up"   sparkData={MONTH_REVENUE.map(w => w.v)} />
          <KPICard label="Tổng đơn"            value="2,840"                                           delta="+156"      deltaDir="up"   sparkData={[82,98,94,124,142,86,61,78,92,88,104,110]} />
          <KPICard label="Khách hoạt động"     value="420"                                             delta="+22%"      deltaDir="up" />
          <KPICard label="Tỉ lệ huỷ"           value="1.8"                                             unit="%"          delta="+0.4%"   deltaDir="down" />
        </>}
        {period === 'quarter' && <>
          <KPICard label="Doanh thu quý"       value={`${(quarterRevenue / 1000000000).toFixed(2)}B`} unit="đ"          delta="+22.4%" deltaDir="up"   sparkData={QUARTER_REVENUE.map(w => w.v)} />
          <KPICard label="Tổng đơn"            value="9.2K"                                            delta="+840"      deltaDir="up"   sparkData={QUARTER_REVENUE.map(w => w.v)} />
          <KPICard label="Khách hoạt động"     value="680"                                             delta="+45%"      deltaDir="up" />
          <KPICard label="Tỉ lệ huỷ"           value="1.6"                                             unit="%"          delta="-0.2%"   deltaDir="up" />
        </>}
      </div>

      {/* Section 1: Chart + Top món */}
      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          {period === 'today' && <>
            <div className="card-title">Đơn theo giờ <span className="muted">· hôm nay</span></div>
            <HourlyChart data={HOURLY_SALES} />
          </>}
          {period === 'week' && <>
            <div className="card-title">Doanh thu theo ngày <span className="muted">· tuần này</span></div>
            <WeekChart />
          </>}
          {period === 'month' && <>
            <div className="card-title">Doanh thu theo ngày <span className="muted">· tháng này</span></div>
            <RevenueChart data={MONTH_REVENUE} showValues={false} labelStep={5} />
          </>}
          {period === 'quarter' && <>
            <div className="card-title">Doanh thu theo tuần <span className="muted">· quý này</span></div>
            <RevenueChart data={QUARTER_REVENUE} showValues={true} labelStep={1} />
          </>}
        </div>
        <div className="card">
          <div className="card-title">🔥 Top món bán chạy <span className="muted">· hôm nay</span></div>
          <TopMonBanChay />
        </div>
      </div>

      {/* Section 2: Live orders + Thanh toán */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1.4fr', gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div className="card-title">Đơn đang xử lý <span className="muted">· real-time</span></div>
          <DonDangXuLy />
        </div>
        <div className="card">
          <div className="card-title">Phân bổ thanh toán <span className="muted">· tuần này</span></div>
          <PaymentPie />
        </div>
      </div>

      {/* Section 3: Heatmap + Cảnh báo kho */}
      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <div className="card">
          <div className="card-title">Mật độ đơn theo giờ <span className="muted">· tuần này</span></div>
          <Heatmap />
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
