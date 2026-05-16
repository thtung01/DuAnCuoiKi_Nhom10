import { Dish } from '@/services/Khách hàng/Thực đơn/typing';

// ─── Kiểu props của thẻ món ăn (DishCard) ───────────────────────────────────
export interface DishCardProps {
    dish: Dish;
    qty: number;
    onAdd: () => void;
    onInc: () => void;
    onDec: () => void;
}
