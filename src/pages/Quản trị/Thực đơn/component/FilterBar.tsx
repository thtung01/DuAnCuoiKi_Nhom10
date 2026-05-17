import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { MENU_CATEGORIES } from '@/services/Khách hàng/Thực đơn';

interface FilterBarProps {
  search: string;
  activeCategory: string;
  totalVisible: number;
  onSearch: (v: string) => void;
  onCategory: (id: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  search, activeCategory, totalVisible, onSearch, onCategory,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
    <div className="search" style={{ maxWidth: 300, margin: 0 }}>
      <SearchOutlined style={{ fontSize: 14 }} />
      <input placeholder="Tìm món…" value={search} onChange={e => onSearch(e.target.value)} />
    </div>
    <div style={{ display: 'flex', gap: 4 }}>
      {MENU_CATEGORIES.map(c => (
        <button
          key={c.id}
          className={`cat-chip ${activeCategory === c.id ? 'active' : ''}`}
          onClick={() => onCategory(c.id)}
          style={{ padding: '5px 10px', fontSize: 11 }}
        >
          {c.name}
        </button>
      ))}
    </div>
    <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-3)' }}>{totalVisible} món</div>
  </div>
);

export default FilterBar;
