import { useState, useCallback } from 'react';
import { Order, OrderStatus } from '@/services/Khách hàng/Orders/typing';

const SEED_ORDERS: Order[] = [
    {
        id: 'BU-2842',
        user: 'u1',
        userName: 'Nguyễn Minh Anh',
        dept: 'Engineering',
        items: [
            { id: 'm2', name: 'Phở bò tái nạm', qty: 1, price: 50000 }
        ],
        total: 50000,
        status: 'pending',
        payment: 'salary',
        created: '12:00',
        pickup: '12:15',
        note: 'Không hành'
    }
];

export default function useOrderModel() {
    const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);

    const addOrder = useCallback((newOrder: Order) => {
        setOrders(prev => [newOrder, ...prev]);
    }, []);

    const advanceOrder = useCallback((orderId: string) => {
        setOrders(prev => prev.map(o => {
            if (o.id !== orderId) return o;
            
            const nextStatus: Record<string, OrderStatus> = {
                pending: 'preparing',
                preparing: 'ready',
                ready: 'done',
                done: 'done'
            };

            return { ...o, status: nextStatus[o.status] || o.status };
        }));
    }, []);

    return {
        orders,
        addOrder,
        advanceOrder
    };
}
