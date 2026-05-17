import React from 'react';
import { useModel } from 'umi';
import { PlusOutlined, CopyOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import FilterBar from './component/FilterBar';
import { MENU_CATEGORIES } from '@/services/Khách hàng/Thực đơn';
import './index.less';

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const ThucDonAdmin: React.FC = () => {
  const { filteredMenu, search, setSearch, activeCategory, setActiveCategory } = useModel('Quản trị.menu');

  return (
    <div className="thuc-don-admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý thực đơn</h1>
          <p className="page-subtitle">Cập nhật thực đơn theo ngày, thêm/sửa/ẩn món, định giá theo phần.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary"><CopyOutlined /> Sao chép từ hôm qua</button>
          <button className="btn btn-primary"><PlusOutlined /> Thêm món mới</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <FilterBar
          search={search}
          activeCategory={activeCategory}
          totalVisible={filteredMenu.length}
          onSearch={setSearch}
          onCategory={setActiveCategory}
        />

        <table className="table">
          <thead>
            <tr>
              <th>Món</th>
              <th>Danh mục</th>
              <th style={{ textAlign: 'right' }}>Giá</th>
              <th style={{ textAlign: 'right' }}>Đã bán</th>
              <th style={{ textAlign: 'right' }}>Đánh giá</th>
              <th>Trạng thái</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredMenu.map(m => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', fontSize: 18 }}>
                      {m.emoji}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.desc}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="chip outline">
                    {MENU_CATEGORIES.find(c => c.id === m.cat)?.name}
                  </span>
                </td>
                <td className="num">{formatVND(m.price)}</td>
                <td className="num">{m.sold}</td>
                <td className="num">{m.rating} ⭐</td>
                <td>
                  <span className="chip green">
                    <span className="dot-status green" /> Đang bán
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn"><EditOutlined /></button>
                  <button className="icon-btn"><MoreOutlined /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThucDonAdmin;
