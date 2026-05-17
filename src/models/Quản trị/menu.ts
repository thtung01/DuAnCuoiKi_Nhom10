import { useState, useMemo } from 'react';
import { Dish } from '@/services/Khách hàng/Thực đơn/typing';
import { SEED_MENU } from '@/services/Khách hàng/Thực đơn';

export default function useAdminMenuModel() {
  const [menu, setMenu] = useState<Dish[]>(SEED_MENU);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMenu = useMemo(
    () =>
      menu.filter(m => {
        if (activeCategory !== 'all' && m.cat !== activeCategory) return false;
        if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [menu, search, activeCategory],
  );

  return { menu, setMenu, search, setSearch, activeCategory, setActiveCategory, filteredMenu };
}
