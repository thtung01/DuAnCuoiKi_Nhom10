import {
  CoffeeOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  WalletOutlined
} from '@ant-design/icons';

export const NAV_EMPLOYEE = [
  { id: 'menu', label: 'Thực đơn', icon: CoffeeOutlined },
  { id: 'cart', label: 'Giỏ của tôi', icon: ShoppingCartOutlined },
  { id: 'orders', label: 'Đơn của tôi', icon: FileTextOutlined },
  { id: 'wallet', label: 'Ví & lịch sử', icon: WalletOutlined },
];

export const defaultUser = {
  avatar: 'MA',
  name: 'Nguyễn Minh Anh',
  dept: 'Engineering'
};
