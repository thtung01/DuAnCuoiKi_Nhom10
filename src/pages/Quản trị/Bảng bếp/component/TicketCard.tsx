import React from 'react';
import { Order } from '@/services/Khách hàng/Orders/typing';

interface TicketCardProps {
  order: Order;
  nextLabel?: string;
  showCancel?: boolean;
  onAdvance?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  order, nextLabel, showCancel, onAdvance, onCancel,
}) => {
  const [h, m] = order.created.split(':').map(Number);
  const now = new Date();
  const elapsed = Math.max(0, (now.getHours() * 60 + now.getMinutes()) - (h * 60 + m));

  return (
    <div className="ticket">
      <div className="ticket-head">
        <span className="ticket-name">
          {order.userName}
          <span style={{ color: 'var(--ink-3)', fontWeight: 400, fontSize: 11, marginLeft: 4 }}>
            · {order.dept}
          </span>
        </span>
        <span className="ticket-id">{order.id}</span>
      </div>

      <div className="ticket-items">
        {order.items.map(it => (
          <div key={it.id} style={{ display: 'flex', gap: 6, fontSize: 12, padding: '2px 0' }}>
            <span className="qty" style={{ fontWeight: 700, minWidth: 20 }}>×{it.qty}</span>
            <span style={{ flex: 1 }}>{it.name}</span>
          </div>
        ))}
      </div>

      {order.note && (
        <div style={{ fontSize: 11, color: 'var(--ink-3)', fontStyle: 'italic', padding: '2px 0' }}>
          📌 {order.note}
        </div>
      )}

      <div className="ticket-foot">
        <span className="mono">nhận {order.pickup}</span>
        <span className={`time ${elapsed > 15 ? 'late' : ''}`}>{elapsed}p</span>
      </div>

      {(onAdvance || onCancel) && (
        <div className="ticket-actions">
          {showCancel && onCancel && (
            <button onClick={() => onCancel(order.id)}>Huỷ</button>
          )}
          {nextLabel && onAdvance && (
            <button className="primary" onClick={() => onAdvance(order.id)}>
              {nextLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
