import { useState, useMemo, useCallback } from 'react';
import { AdminPage } from '@/services/Quản trị/typing';

const PAGE_LABELS: Record<AdminPage, string> = {
  dashboard:   'Tổng quan',
  kitchen:     'Bảng đơn bếp',
  'menu-mgmt': 'Thực đơn',
  inventory:   'Kho nguyên liệu',
  users:       'Người dùng',
  reports:     'Báo cáo',
};

export default function useAdminGlobalModel() {
  const [page, setPage] = useState<AdminPage>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const breadcrumbs = useMemo(
    () => ['Quản trị', PAGE_LABELS[page]],
    [page],
  );

  return { page, setPage, theme, toggleTheme, breadcrumbs };
}
