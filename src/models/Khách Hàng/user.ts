import { useState } from 'react';

export default function useUserModel() {
  const [role, setRole] = useState<'employee'>('employee');
  const [currentUser] = useState({
    avatar: 'MA',
    name: 'Nguyễn Minh Anh',
    dept: 'Engineering'
  });

  return {
    role,
    setRole,
    currentUser
  };
}
