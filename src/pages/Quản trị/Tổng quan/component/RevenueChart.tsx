import React from 'react';

interface RevenueChartProps {
  data: { d: string; v: number }[];
  showValues?: boolean;
  labelStep?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, showValues = true, labelStep = 1 }) => {
  const max = Math.max(...data.map(d => d.v));
  const peak = data.reduce((a, b) => (b.v > a.v ? b : a));

  return (
    <>
      <div className="bars">
        {data.map((d, i) => (
          <div
            key={d.d}
            className={`bar ${d.d === peak.d ? 'peak' : ''}`}
            style={{ height: `${(d.v / max) * 100}%` }}
          >
            {showValues && i % labelStep === 0 && (
              <span className="v">{(d.v / 1000000).toFixed(1)}M</span>
            )}
          </div>
        ))}
      </div>
      <div className="bar-labels">
        {data.map((d, i) => (
          <span key={d.d}>{i % labelStep === 0 ? d.d : ''}</span>
        ))}
      </div>
    </>
  );
};

export default RevenueChart;
