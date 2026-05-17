import React from 'react';

const PIE_DATA = [
  { label: 'Ví nội bộ', pct: 42, color: 'var(--green-500)' },
  { label: 'QR / Bank',  pct: 28, color: 'var(--info-500)' },
  { label: 'Trừ lương',  pct: 18, color: 'var(--warn-500)' },
  { label: 'Tiền mặt',   pct: 12, color: 'var(--ink-3)'    },
];

const PaymentPie: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '12px 0' }}>
    <svg width="180" height="180" viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
      <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="var(--bg-soft)"    strokeWidth="6" />
      <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="var(--green-500)"  strokeWidth="6" strokeDasharray="42 100" strokeDashoffset="0"   transform="rotate(-90 21 21)" />
      <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="var(--info-500)"   strokeWidth="6" strokeDasharray="28 100" strokeDashoffset="-42"  transform="rotate(-90 21 21)" />
      <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="var(--warn-500)"   strokeWidth="6" strokeDasharray="18 100" strokeDashoffset="-70"  transform="rotate(-90 21 21)" />
      <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="var(--ink-3)"      strokeWidth="6" strokeDasharray="12 100" strokeDashoffset="-88"  transform="rotate(-90 21 21)" />
    </svg>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {PIE_DATA.map(r => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: r.color, flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{r.label}</span>
          <span className="mono" style={{ fontWeight: 600 }}>{r.pct}%</span>
        </div>
      ))}
    </div>
  </div>
);

export default PaymentPie;
