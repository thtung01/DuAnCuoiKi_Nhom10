import { useState } from 'react';
import { getUser } from '@/services/auth';

const DEFAULT_USER = { avatar: 'MA', name: 'Nguyễn Minh Anh', dept: 'Engineering' };

export default function useUserModel() {
  const [role, setRole] = useState<'employee'>('employee');

  const stored = getUser();
  const currentUser = stored
    ? { avatar: stored.avatar, name: stored.name, dept: stored.dept }
    : DEFAULT_USER;

  return {
    role,
    setRole,
    currentUser,
  };
}
