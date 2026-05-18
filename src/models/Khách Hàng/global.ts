import { useState, useCallback, useMemo } from 'react';
import { ThemeType } from '@/services/Khách hàng/Component/topbar/typing';

const PAGE_TITLES: Record<string, string> = {
  menu: 'Thực đơn hôm nay',
  history: 'Lịch sử đơn hàng',
  vouchers: 'Kho Voucher',
  profile: 'Thông tin cá nhân',
  settings: 'Cài đặt tài khoản',
};

export default function useGlobalModel() {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.LIGHT);
  const [page, setPage] = useState('menu');

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? ThemeType.DARK : ThemeType.LIGHT));
  }, []);

  const breadcrumbs = useMemo(() => {
    return ['Khách hàng', PAGE_TITLES[page] || page];
  }, [page]);

  return {
    theme,
    toggleTheme,
    setTheme,
    page,
    setPage,
    breadcrumbs
  };
}
