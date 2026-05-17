import { useState, useCallback } from 'react';
import { Order, OrderStatus } from '@/services/Khách hàng/Orders/typing';

const NEXT_STATUS: Record<OrderStatus, OrderStatus> = {
  pending:   'preparing',
  preparing: 'ready',
  ready:     'done',
  done:      'done',
  cancelled: 'cancelled',
};

const ADMIN_SEED_ORDERS: Order[] = [
  {
    id: 'BU-2840',
    user: 'u5',
    userName: 'Vũ Lan Phương',
    dept: 'Marketing',
    items: [
      { id: 'm1', name: 'Cơm tấm sườn nướng', qty: 1, price: 45000 },
      { id: 'm10', name: 'Cà phê sữa đá', qty: 1, price: 25000 },
    ],
    total: 70000,
    status: 'pending',
    payment: 'wallet',
    created: '11:45',
    pickup: '12:00',
  },
  {
    id: 'BU-2841',
    user: 'u2',
    userName: 'Trần Thị Hương',
    dept: 'HR',
    items: [
      { id: 'm2', name: 'Phở bò tái nạm', qty: 1, price: 50000 },
    ],
    total: 50000,
    status: 'preparing',
    payment: 'salary',
    created: '11:50',
    pickup: '12:10',
    note: 'Ít hành',
  },
  {
    id: 'BU-2842',
    user: 'u1',
    userName: 'Nguyễn Minh Anh',
    dept: 'Engineering',
    items: [
      { id: 'm6', name: 'Mỳ Ý sốt bò bằm', qty: 1, price: 52000 },
    ],
    total: 52000,
    status: 'pending',
    payment: 'salary',
    created: '12:00',
    pickup: '12:15',
    note: 'Không hành',
  },
  {
    id: 'BU-2843',
    user: 'u7',
    userName: 'Bùi Khánh Linh',
    dept: 'Engineering',
    items: [
      { id: 'm5', name: 'Salad ức gà nướng', qty: 1, price: 55000 },
      { id: 'm11', name: 'Sinh tố xoài', qty: 1, price: 35000 },
    ],
    total: 90000,
    status: 'ready',
    payment: 'qr',
    created: '11:30',
    pickup: '11:55',
  },
  {
    id: 'BU-2844',
    user: 'u4',
    userName: 'Phạm Quốc Đạt',
    dept: 'Sales',
    items: [
      { id: 'm4', name: 'Gà kho gừng + cơm trắng', qty: 1, price: 42000 },
    ],
    total: 42000,
    status: 'preparing',
    payment: 'wallet',
    created: '11:55',
    pickup: '12:15',
  },
  {
    id: 'BU-2838',
    user: 'u3',
    userName: 'Lê Hoàng Nam',
    dept: 'Finance',
    items: [
      { id: 'm3', name: 'Bún chả Hà Nội', qty: 2, price: 48000 },
    ],
    total: 96000,
    status: 'done',
    payment: 'salary',
    created: '11:20',
    pickup: '11:45',
  },
];

export default function useKitchenModel() {
  const [orders, setOrders] = useState<Order[]>(ADMIN_SEED_ORDERS);

  const advanceOrder = useCallback((orderId: string, nextStatus?: OrderStatus) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: nextStatus ?? NEXT_STATUS[o.status] }
          : o,
      ),
    );
  }, []);

  return { orders, setOrders, advanceOrder };
}
