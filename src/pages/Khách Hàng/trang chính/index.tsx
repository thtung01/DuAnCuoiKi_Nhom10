import React from 'react';
import { useModel } from 'umi';
import Sidebar from '../Component/Sidebar/Sidebar';
import Topbar from '../Component/topbar';
import EmployeeMenu from '../Thucdon';
import HistoryPage from '../History';
import VoucherPage from '../Voucher';
import ProfilePage from '../Profile';
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
      case 'vouchers':
        return <VoucherPage />;
      case 'profile':
        return <ProfilePage />;
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
    </div>
  );
};

export default MainPage;
