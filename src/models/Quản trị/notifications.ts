import { useState } from 'react';

export interface Notification {
  id: string;
  type: 'order' | 'stock' | 'system';
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

const SEED: Notification[] = [
  { id: 'n1', type: 'order',  title: 'Đơn mới #DH-1058',        desc: 'Nguyễn Minh Anh · Cơm gà + Canh chua',       time: '2 phút',   read: false },
  { id: 'n2', type: 'stock',  title: 'Cảnh báo kho',             desc: 'Thịt gà chỉ còn 2 kg (ngưỡng: 5 kg)',         time: '15 phút',  read: false },
  { id: 'n3', type: 'order',  title: 'Đơn #DH-1057 hoàn thành', desc: 'Trần Thị Hương · đã giao thành công',         time: '32 phút',  read: false },
  { id: 'n4', type: 'stock',  title: 'Cảnh báo kho',             desc: 'Rau cải còn 1.5 kg (ngưỡng: 3 kg)',           time: '1 giờ',    read: true  },
  { id: 'n5', type: 'system', title: 'Báo cáo tuần sẵn sàng',   desc: 'Xuất báo cáo doanh thu tuần 18/05',           time: '2 giờ',    read: true  },
  { id: 'n6', type: 'order',  title: 'Đơn mới #DH-1056',        desc: 'Vũ Lan Phương · Bún bò Huế + Trà đào',       time: '3 giờ',    read: true  },
];

export default function useNotificationsModel() {
  const [notifs, setNotifs] = useState<Notification[]>(SEED);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markRead    = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()           => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return { notifs, unreadCount, markRead, markAllRead };
}
