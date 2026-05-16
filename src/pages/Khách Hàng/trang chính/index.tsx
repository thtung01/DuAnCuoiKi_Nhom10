import React from 'react';
import { useModel } from 'umi';
import Sidebar from '../Component/Sidebar/Sidebar';
import Topbar from '../Component/topbar';
import EmployeeMenu from '../Thucdon';
import HistoryPage from '../Đơn Hàng';
import GioHang from '../Giỏ Hàng';
import './index.less';

const MainPage: React.FC = () => {
  const { page } = useModel('Khách Hàng.global');
  const { setCartOpen } = useModel('Khách Hàng.Thực đơn.index');

  const renderContent = () => {
    switch (page) {
      case 'menu':
        return <EmployeeMenu onOpenCart={() => setCartOpen(true)} ordersToday={12} />;
      case 'history':
        return <HistoryPage />;
      default:
        return null;
    }
  };

  return (
    <div className="main-page-container">
      <Sidebar />
      <main className="content-area">
        <Topbar />
        <section className="content-body">
          {renderContent()}
        </section>
      </main>

      {/* Giỏ hàng — drawer trượt từ phải, tự quản lý qua cartOpen */}
      <GioHang />
    </div>
  );
};

export default MainPage;
