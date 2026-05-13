import { useState, useCallback, useMemo } from 'react';
import { Dish } from '@/services/Khách hàng/Thực đơn/typing';
import { SEED_MENU, MENU_CATEGORIES } from '@/services/Khách hàng/Thực đơn';

export default function useCartModel() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((dish: Dish) => {
    setCart(prev => [...prev, { ...dish, qty: 1 }]);
  }, []);

  const incCart = useCallback((id: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  }, []);

  const decCart = useCallback((id: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item).filter(item => item.qty > 0));
  }, []);

  const filteredMenu = useMemo(() => {
    if (activeCategory === 'all') return SEED_MENU;
    return SEED_MENU.filter(d => d.cat === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: SEED_MENU.length
    };
    MENU_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = SEED_MENU.filter(d => d.cat === cat.id).length;
      }
    });
    return counts;
  }, []);

  return {
    cart,
    addToCart,
    incCart,
    decCart,
    activeCategory,
    setActiveCategory,
    filteredMenu,
    categoryCounts,
    cartOpen,
    setCartOpen
  };
}
