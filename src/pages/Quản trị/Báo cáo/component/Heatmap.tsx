import React, { useMemo } from 'react';

const DAY_LABELS  = ['T2','T3','T4','T5','T6','T7','CN'];
const HOUR_LABELS = ['7','8','9','10','11','12','13','14','15','16','17','18'];

const Heatmap: React.FC = () => {
  const data = useMemo(
    () =>
      Array.from({ length: 7 }, (_, d) =>
        Array.from({ length: 12 }, (_, h) => {
          let v = h >= 4 && h <= 7
            ? Math.min(5, Math.floor(Math.random() * 4) + 2)
            : h <= 3
            ? Math.floor(Math.random() * 2)
            : Math.floor(Math.random() * 3);
          if (d >= 5) v = Math.max(0, v - 2);
          return v;
        }),
      ),
    [],
  );

  return (
    <div>
      <div className="heatmap">
        <span />
        {HOUR_LABELS.map(h => (
          <span key={h} className="lbl" style={{ textAlign: 'center' }}>{h}h</span>
        ))}
        {data.map((row, di) => (
          <React.Fragment key={di}>
            <span className="lbl">{DAY_LABELS[di]}</span>
            {row.map((v, hi) => <div key={hi} className="cell" data-h={v} />)}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 11, color: 'var(--ink-3)' }}>
        <span>Ít</span>
        {[0,1,2,3,4,5].map(n => (
          <div key={n} className="cell" data-h={n} style={{ width: 14, height: 14, borderRadius: 3 }} />
        ))}
        <span>Nhiều</span>
      </div>
    </div>
  );
};

export default Heatmap;
