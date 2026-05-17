import React, { useMemo } from 'react';
import { useModel } from 'umi';
import { PlusOutlined, SearchOutlined, MoreOutlined, SafetyOutlined } from '@ant-design/icons';
import KPICard from '../Tổng quan/component/KPICard';
import { ROLE_CONFIG } from '@/services/Quản trị/Người dùng';
import { AdminUser } from '@/services/Quản trị/typing';
import './index.less';

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const NguoiDung: React.FC = () => {
  const { users, search, setSearch, roleFilter, setRoleFilter } = useModel('Quản trị.users');

  const visible = useMemo(
    () =>
      users.filter(u => {
        if (roleFilter !== 'all' && u.role !== roleFilter) return false;
        if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [users, search, roleFilter],
  );

  const totalCredit = users.reduce((s, u) => s + u.credit, 0);

  return (
    <div className="nguoi-dung-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Người dùng & phân quyền</h1>
          <p className="page-subtitle">Quản lý nhân viên, phòng ban và quyền truy cập.</p>
        </div>
        <button className="btn btn-primary"><PlusOutlined /> Thêm tài khoản</button>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 16 }}>
        <KPICard label="Tổng người dùng"   value={users.length}                                    delta="+3 tháng này" deltaDir="up" />
        <KPICard label="Hoạt động hôm nay" value="186"                                             delta="62%" deltaDir="up" />
        <KPICard label="Tổng số dư ví"     value={`${(totalCredit / 1000000).toFixed(2)}M`} unit="đ" />
        <KPICard label="Đơn TB / người"    value="38"                                              delta="+5" deltaDir="up" />
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search" style={{ maxWidth: 300, margin: 0 }}>
            <SearchOutlined style={{ fontSize: 14 }} />
            <input placeholder="Tìm người dùng…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="seg-radio">
            {(['all', 'staff', 'kitchen', 'admin'] as const).map(v => (
              <button
                key={v}
                className={roleFilter === v ? 'active' : ''}
                onClick={() => setRoleFilter(v as 'all' | AdminUser['role'])}
              >
                {{ all: 'Tất cả', staff: 'Nhân viên', kitchen: 'Bếp', admin: 'Quản trị' }[v]}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-3)' }}>{visible.length} người</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Phòng ban</th>
              <th>Vai trò</th>
              <th style={{ textAlign: 'right' }}>Số dư ví</th>
              <th style={{ textAlign: 'right' }}>Tổng đơn</th>
              <th>Ngày tham gia</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map(u => {
              const rc = ROLE_CONFIG[u.role];
              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-soft-ink)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 11 }}>
                        {u.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="chip outline">{u.dept}</span></td>
                  <td>
                    <span className={`chip ${rc.color}`}>
                      {u.role === 'admin' && <SafetyOutlined style={{ fontSize: 10 }} />}
                      {rc.label}
                    </span>
                  </td>
                  <td className="num">{formatVND(u.credit)}đ</td>
                  <td className="num">{u.orders}</td>
                  <td>{u.joined}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="icon-btn"><MoreOutlined /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NguoiDung;
