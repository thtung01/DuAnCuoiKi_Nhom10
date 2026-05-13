import React, { useState } from 'react';
import {
    PlusOutlined,
    MinusOutlined,
    HeartOutlined,
    HeartFilled,
    ClockCircleOutlined,
    ThunderboltOutlined,
    AppstoreOutlined,
    CoffeeOutlined,
    ShopOutlined,
    ContainerOutlined,
    FireOutlined,
    RestOutlined
} from '@ant-design/icons';
import { MENU_CATEGORIES, SEED_MENU } from '@/services/Khách hàng/Thực đơn';
import { Dish, EmployeeMenuProps } from '@/services/Khách hàng/Thực đơn/typing';
import { useModel } from 'umi';
import './index.less';

const IconMap: Record<string, React.ReactNode> = {
    AppstoreOutlined: <AppstoreOutlined />,
    CoffeeOutlined: <CoffeeOutlined />,
    ShopOutlined: <ShopOutlined />,
    ContainerOutlined: <ContainerOutlined />,
    HeartOutlined: <HeartOutlined />,
    FireOutlined: <FireOutlined />,
    RestOutlined: <RestOutlined />,
};

const MenuHero = ({ orders, totalDishes }: { orders: number, totalDishes: number }) => (
    <div className="menu-hero">
        <div className="hero-content">
            <h2>Chào buổi trưa! 👋</h2>
            <p>Hôm nay có <strong>{totalDishes} món mới</strong> sẵn sàng phục vụ bạn. Đừng quên đặt món trước để nhận ưu đãi nhé.</p>
            <div className="hero-stats">
                <div className="hero-stat">
                    <strong>{orders}</strong>
                    <span>Đơn đã đặt</span>
                </div>
                <div className="hero-stat">
                    <strong>15 phút</strong>
                    <span>Thời gian chờ</span>
                </div>
            </div>
        </div>
        <div className="hero-decoration">
            {/* Could add an image or illustration here */}
        </div>
    </div>
);

const DayTabs = ({ selected, onSelect }: { selected: number, onSelect: (v: number) => void }) => {
    const days = [
        { name: 'Thứ 2', num: 12 },
        { name: 'Thứ 3', num: 13 },
        { name: 'Thứ 4', num: 14 },
        { name: 'Thứ 5', num: 15 },
        { name: 'Thứ 6', num: 16 },
        { name: 'Thứ 7', num: 17 },
    ];
    return (
        <div className="day-tabs">
            {days.map((d, i) => (
                <button
                    key={i}
                    className={`day-tab ${selected === i ? 'active' : ''}`}
                    onClick={() => onSelect(i)}
                >
                    <span className="day-name">{d.name}</span>
                    <span className="day-num">{d.num}</span>
                </button>
            ))}
        </div>
    );
};

const CategoryBar = () => {
    const { activeCategory, setActiveCategory, categoryCounts } = useModel('Khách Hàng.Thực đơn.index');
    return (
        <div className="category-bar">
            {MENU_CATEGORIES.map(cat => {
                return (
                    <button
                        key={cat.id}
                        className={`cat-chip ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {IconMap[cat.icon]}
                        {cat.name}
                        <span className="count">{categoryCounts[cat.id] || 0}</span>
                    </button>
                );
            })}
        </div>
    );
};

const DishCard = ({
    dish, qty, onAdd, onInc, onDec
}: {
    dish: Dish, qty: number, onAdd: () => void, onInc: () => void, onDec: () => void
}) => (
    <div className="dish-card">
        <div className="dish-image">
            <div className="placeholder">
                <span className="ph-emoji">{dish.emoji}</span>
            </div>
            <div className="dish-tags">
                {dish.tags.map(t => <span key={t} className={`dish-tag ${t}`}>{t.toUpperCase()}</span>)}
            </div>

        </div>
        <div className="dish-body">
            <h3 className="dish-name">{dish.name}</h3>
            <p className="dish-desc">{dish.desc}</p>
            <div className="dish-meta">
                <span><ClockCircleOutlined /> {dish.prep}m</span>
                <span><ThunderboltOutlined /> {dish.kcal} kcal</span>
            </div>
            <div className="dish-foot">
                <div className="dish-price">
                    {dish.price.toLocaleString()} <span className="currency">đ</span>
                </div>
                {qty === 0 ? (
                    <button className="dish-add" onClick={onAdd}>
                        <PlusOutlined />
                    </button>
                ) : (
                    <div className="dish-qty">
                        <button onClick={onDec}><MinusOutlined /></button>
                        <span>{qty}</span>
                        <button onClick={onInc}><PlusOutlined /></button>
                    </div>
                )}
            </div>
        </div>
    </div>
);


const EmployeeMenu: React.FC<EmployeeMenuProps> = ({
    onOpenCart, ordersToday
}) => {
    const { cart, addToCart: onAdd, incCart: onInc, decCart: onDec, filteredMenu } = useModel('Khách Hàng.Thực đơn.index');
    const [day, setDay] = useState(0);

    const cartQty = (id: string) => {
        const it = cart.find(c => c.id === id);
        return it ? it.qty : 0;
    };

    return (
        <div className="employee-menu-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Thực đơn hôm nay</h1>
                    <p className="page-subtitle">Chọn món, đặt trước - không cần xếp hàng.</p>
                </div>
            </div>

            <MenuHero orders={ordersToday} totalDishes={filteredMenu.length} />

            <DayTabs selected={day} onSelect={setDay} />
            <CategoryBar />

            <div className="menu-grid">
                {filteredMenu.map(d => (
                    <DishCard
                        key={d.id}
                        dish={d}
                        qty={cartQty(d.id)}
                        onAdd={() => onAdd(d)}
                        onInc={() => onInc(d.id)}
                        onDec={() => onDec(d.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeeMenu;
