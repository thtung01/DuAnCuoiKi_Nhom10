import { AdminUser } from '../typing';

export const SEED_USERS: AdminUser[] = [
  { id: 'u1', name: 'Nguyễn Minh Anh',   dept: 'Engineering', role: 'staff',   email: 'minh.anh@congty.vn',  credit: 320000, orders: 47, joined: '02/2024', avatar: 'MA' },
  { id: 'u2', name: 'Trần Thị Hương',    dept: 'HR',          role: 'staff',   email: 'huong.tt@congty.vn',  credit: 180000, orders: 32, joined: '08/2023', avatar: 'TH' },
  { id: 'u3', name: 'Lê Hoàng Nam',      dept: 'Finance',     role: 'admin',   email: 'nam.lh@congty.vn',    credit: 450000, orders: 88, joined: '01/2022', avatar: 'LN' },
  { id: 'u4', name: 'Phạm Quốc Đạt',    dept: 'Sales',       role: 'staff',   email: 'dat.pq@congty.vn',    credit: 95000,  orders: 21, joined: '05/2024', avatar: 'PĐ' },
  { id: 'u5', name: 'Vũ Lan Phương',     dept: 'Marketing',   role: 'staff',   email: 'phuong.vl@congty.vn', credit: 220000, orders: 39, joined: '11/2023', avatar: 'VP' },
  { id: 'u6', name: 'Đỗ Văn Hùng',      dept: 'Bếp',         role: 'kitchen', email: 'hung.dv@congty.vn',   credit: 0,      orders: 0,  joined: '03/2022', avatar: 'ĐH' },
  { id: 'u7', name: 'Bùi Khánh Linh',   dept: 'Engineering', role: 'staff',   email: 'linh.bk@congty.vn',   credit: 410000, orders: 55, joined: '07/2023', avatar: 'BL' },
  { id: 'u8', name: 'Hoàng Thanh Tùng', dept: 'Operations',  role: 'staff',   email: 'tung.ht@congty.vn',   credit: 75000,  orders: 19, joined: '02/2025', avatar: 'HT' },
];

export const ROLE_CONFIG: Record<AdminUser['role'], { label: string; color: string }> = {
  admin:   { label: 'Quản trị', color: 'green' },
  staff:   { label: 'Nhân viên', color: '' },
  kitchen: { label: 'Bếp', color: 'info' },
};

export const HOURLY_SALES = [
  { h: '06', v: 8  }, { h: '07', v: 24  }, { h: '08', v: 18 }, { h: '09', v: 12 },
  { h: '10', v: 22 }, { h: '11', v: 86  }, { h: '12', v: 124 }, { h: '13', v: 64 },
  { h: '14', v: 32 }, { h: '15', v: 28  }, { h: '16', v: 18 }, { h: '17', v: 42 },
];

export const WEEK_REVENUE = [
  { d: 'T2', v: 9800000  }, { d: 'T3', v: 11200000 }, { d: 'T4', v: 10500000 },
  { d: 'T5', v: 12400000 }, { d: 'T6', v: 13800000 }, { d: 'T7', v: 7200000  },
  { d: 'CN', v: 4200000  },
];

export const MONTH_REVENUE = [
  { d: '1',  v: 11200000 }, { d: '2',  v: 12400000 }, { d: '3',  v: 5400000  },
  { d: '4',  v: 3900000  }, { d: '5',  v: 10800000 }, { d: '6',  v: 11600000 },
  { d: '7',  v: 12800000 }, { d: '8',  v: 13200000 }, { d: '9',  v: 14600000 },
  { d: '10', v: 5600000  }, { d: '11', v: 4200000  }, { d: '12', v: 10400000 },
  { d: '13', v: 11800000 }, { d: '14', v: 12600000 }, { d: '15', v: 13400000 },
  { d: '16', v: 14800000 }, { d: '17', v: 5800000  }, { d: '18', v: 4600000  },
  { d: '19', v: 11400000 }, { d: '20', v: 12800000 }, { d: '21', v: 13600000 },
  { d: '22', v: 14400000 }, { d: '23', v: 15200000 }, { d: '24', v: 6400000  },
  { d: '25', v: 5000000  }, { d: '26', v: 12600000 }, { d: '27', v: 14000000 },
  { d: '28', v: 15200000 }, { d: '29', v: 16400000 }, { d: '30', v: 16800000 },
];

export const QUARTER_REVENUE = [
  { d: 'T1',  v: 62400000  }, { d: 'T2',  v: 68200000  }, { d: 'T3',  v: 71600000  },
  { d: 'T4',  v: 74800000  }, { d: 'T5',  v: 78200000  }, { d: 'T6',  v: 82600000  },
  { d: 'T7',  v: 79400000  }, { d: 'T8',  v: 84200000  }, { d: 'T9',  v: 88600000  },
  { d: 'T10', v: 91200000  }, { d: 'T11', v: 94800000  }, { d: 'T12', v: 98400000  },
  { d: 'T13', v: 102600000 },
];
