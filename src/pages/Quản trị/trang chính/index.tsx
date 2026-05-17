import React from 'react';
import { useModel } from 'umi';
import AdminSidebar from '../Component/Sidebar/Sidebar';
import AdminTopbar from '../Component/Topbar';
import TongQuan from '../Tổng quan';
import BangBep from '../Bảng bếp';
import ThucDonAdmin from '../Thực đơn';
import KhoNguyenLieu from '../Kho nguyên liệu';
import NguoiDung from '../Người dùng';
import BaoCao from '../Báo cáo';
import './index.less';

const AdminPage: React.FC = () => {
  const { page } = useModel('Quản trị.global');

  const renderContent = () => {
    switch (page) {
      case 'dashboard':  return <TongQuan />;
      case 'kitchen':    return <BangBep />;
      case 'menu-mgmt':  return <ThucDonAdmin />;
      case 'inventory':  return <KhoNguyenLieu />;
      case 'users':      return <NguoiDung />;
      case 'reports':    return <BaoCao />;
      default:           return <TongQuan />;
    }
  };

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <AdminTopbar />
        <section className="admin-content">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
