import { useState } from 'react';
import { AdminUser } from '@/services/Quản trị/typing';
import { SEED_USERS } from '@/services/Quản trị/Người dùng';

export default function useUsersModel() {
  const [users] = useState<AdminUser[]>(SEED_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | AdminUser['role']>('all');

  return { users, search, setSearch, roleFilter, setRoleFilter };
}
