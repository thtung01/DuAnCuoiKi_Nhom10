import { useState } from 'react';
import { InventoryItem } from '@/services/Quản trị/typing';
import { SEED_INVENTORY } from '@/services/Quản trị/Kho';

export default function useInventoryModel() {
  const [inventory, setInventory] = useState<InventoryItem[]>(SEED_INVENTORY);
  const [search, setSearch] = useState('');

  return { inventory, setInventory, search, setSearch };
}
