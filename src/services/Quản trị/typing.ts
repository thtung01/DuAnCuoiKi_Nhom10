export interface AdminUser {
  id: string;
  name: string;
  dept: string;
  role: 'admin' | 'staff' | 'kitchen';
  email: string;
  credit: number;
  orders: number;
  joined: string;
  avatar: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  stock: number;
  threshold: number;
  max: number;
  supplier: string;
  emoji: string;
  cost: number;
}

export type AdminPage =
  | 'dashboard'
  | 'kitchen'
  | 'menu-mgmt'
  | 'inventory'
  | 'users'
  | 'reports';

export type DeltaDir = 'up' | 'down' | '';

export interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaDir?: DeltaDir;
  sparkData?: number[];
}
