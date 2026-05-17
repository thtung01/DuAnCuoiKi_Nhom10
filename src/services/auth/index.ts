export interface AuthUser {
  role: 'employee' | 'admin';
  name: string;
  dept: string;
  avatar: string;
  phone: string;
}

const STORAGE_KEY = 'canteen_user';

export const ACCOUNTS: Array<AuthUser & { password: string }> = [
  {
    role:     'employee',
    phone:    '0987654321',
    password: 'password123',
    name:     'Nguyễn Minh Anh',
    dept:     'Engineering',
    avatar:   'MA',
  },
  {
    role:     'admin',
    phone:    '0000000001',
    password: 'admin123',
    name:     'Lê Hoàng Nam',
    dept:     'Quản trị',
    avatar:   'LN',
  },
];

export function login(phone: string, password: string): AuthUser | null {
  const found = ACCOUNTS.find(a => a.phone === phone && a.password === password);
  if (!found) return null;
  const user: AuthUser = { role: found.role, name: found.name, dept: found.dept, avatar: found.avatar, phone: found.phone };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function isAdmin(): boolean {
  return getUser()?.role === 'admin';
}
