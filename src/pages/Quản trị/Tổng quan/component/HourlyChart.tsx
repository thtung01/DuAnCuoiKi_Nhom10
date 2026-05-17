import React from 'react';

interface HourData { h: string; v: number; }

const HourlyChart: React.FC<{ data: HourData[] }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.v));
  const peak = data.reduce((a, b) => (b.v > a.v ? b : a));

  return (
    <>
      <div className="bars">
        {data.map(d => (
          <div
            key={d.h}
            className={`bar ${d.h === peak.h ? 'peak' : ''}`}
            style={{ height: `${(d.v / max) * 100}%` }}
          >
            <span className="v">{d.v}</span>
          </div>
        ))}
      </div>
      <div className="bar-labels">
        {data.map(d => <span key={d.h}>{d.h}</span>)}
      </div>
    </>
  );
};

export default HourlyChart;
