import { InventoryItem } from '../typing';

export const SEED_INVENTORY: InventoryItem[] = [
  { id: 'i1',  name: 'Gạo Jasmine',      unit: 'kg',   stock: 48,  threshold: 30,  max: 200, supplier: 'Vinh Hiền',    emoji: '🌾', cost: 22000  },
  { id: 'i2',  name: 'Thịt heo (sườn)',  unit: 'kg',   stock: 12,  threshold: 15,  max: 50,  supplier: 'Vissan',       emoji: '🥩', cost: 145000 },
  { id: 'i3',  name: 'Thịt bò',          unit: 'kg',   stock: 18,  threshold: 12,  max: 40,  supplier: 'CP Foods',     emoji: '🥩', cost: 280000 },
  { id: 'i4',  name: 'Thịt gà',          unit: 'kg',   stock: 22,  threshold: 15,  max: 40,  supplier: 'Ba Huân',      emoji: '🍗', cost: 95000  },
  { id: 'i5',  name: 'Bánh phở tươi',    unit: 'kg',   stock: 8,   threshold: 10,  max: 30,  supplier: 'Phở Thìn',    emoji: '🍜', cost: 18000  },
  { id: 'i6',  name: 'Bún tươi',         unit: 'kg',   stock: 14,  threshold: 10,  max: 30,  supplier: 'Bún Hùng',    emoji: '🍜', cost: 16000  },
  { id: 'i7',  name: 'Trứng gà',         unit: 'quả',  stock: 240, threshold: 120, max: 500, supplier: 'Ba Huân',      emoji: '🥚', cost: 3500   },
  { id: 'i8',  name: 'Rau xà lách',      unit: 'kg',   stock: 6,   threshold: 8,   max: 25,  supplier: 'Đà Lạt Farm', emoji: '🥬', cost: 35000  },
  { id: 'i9',  name: 'Cà chua',          unit: 'kg',   stock: 16,  threshold: 10,  max: 30,  supplier: 'Đà Lạt Farm', emoji: '🍅', cost: 28000  },
  { id: 'i10', name: 'Đậu hũ',           unit: 'bịch', stock: 32,  threshold: 20,  max: 80,  supplier: 'Vifon',        emoji: '🫘', cost: 8000   },
  { id: 'i11', name: 'Cà phê hạt',       unit: 'kg',   stock: 4.5, threshold: 5,   max: 20,  supplier: 'Trung Nguyên', emoji: '☕', cost: 220000 },
  { id: 'i12', name: 'Sữa đặc',          unit: 'lon',  stock: 18,  threshold: 12,  max: 40,  supplier: 'Vinamilk',     emoji: '🥛', cost: 24000  },
  { id: 'i13', name: 'Đào ngâm',         unit: 'lon',  stock: 9,   threshold: 8,   max: 25,  supplier: 'Goldenfarm',   emoji: '🍑', cost: 65000  },
  { id: 'i14', name: 'Mỳ Ý spaghetti',   unit: 'kg',   stock: 11,  threshold: 8,   max: 25,  supplier: 'Barilla',      emoji: '🍝', cost: 85000  },
  { id: 'i15', name: 'Hành lá',          unit: 'kg',   stock: 3,   threshold: 4,   max: 12,  supplier: 'Đà Lạt Farm', emoji: '🌿', cost: 30000  },
];
