import React from 'react';
import { useModel } from 'umi';
import { SyncOutlined } from '@ant-design/icons';
import TicketCard from './component/TicketCard';
import { OrderStatus } from '@/services/Khách hàng/Orders/typing';
import './index.less';

interface ColConfig {
  key: OrderStatus;
  title: string;
  color: string;
  next?: OrderStatus;
  nextLabel?: string;
  showCancel?: boolean;
}

const COLS: ColConfig[] = [
  { key: 'pending',   title: 'Chờ xác nhận',  color: 'warn',  next: 'preparing', nextLabel: 'Bắt đầu nấu', showCancel: true },
  { key: 'preparing', title: 'Đang chuẩn bị', color: 'info',  next: 'ready',     nextLabel: 'Báo sẵn sàng' },
  { key: 'ready',     title: 'Sẵn sàng giao', color: 'green', next: 'done',      nextLabel: 'Đã giao' },
  { key: 'done',      title: 'Hoàn thành',    color: '' },
];

const BangBep: React.FC = () => {
  const { orders, advanceOrder } = useModel('Quản trị.kitchen');

  return (
    <div className="bang-bep-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Bảng đơn bếp</h1>
          <p className="page-subtitle">Bấm nút để chuyển trạng thái · đồng bộ real-time với nhân viên.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="chip">
            <span className="dot-status green dot-pulse" />
            LIVE
          </span>
          <button className="btn btn-secondary"><SyncOutlined /> Làm mới</button>
        </div>
      </div>

      <div className="ticket-board">
        {COLS.map(col => {
          const list = orders.filter(o => o.status === col.key);
          return (
            <div key={col.key} className="ticket-col">
              <div className="ticket-col-head">
                <div className="ttl">
                  <span className={`dot-status ${col.color}`} />
                  {col.title}
                </div>
                <div className="cnt">{list.length}</div>
              </div>

              {list.length === 0 && (
                <div style={{ padding: 20, textAlign: 'center', color: 'var(--ink-4)', fontSize: 12 }}>
                  Chưa có đơn
                </div>
              )}

              {list.map(o => (
                <TicketCard
                  key={o.id}
                  order={o}
                  nextLabel={col.nextLabel}
                  showCancel={col.showCancel}
                  onAdvance={col.next ? id => advanceOrder(id, col.next) : undefined}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BangBep;
