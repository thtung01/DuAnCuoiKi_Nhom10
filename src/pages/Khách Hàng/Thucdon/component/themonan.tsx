import React from 'react';
import {
    PlusOutlined,
    MinusOutlined,
    ClockCircleOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { DishCardProps } from '@/services/Khách hàng/Thực đơn/component/themonan';

const DishCard: React.FC<DishCardProps> = ({ dish, qty, onAdd, onInc, onDec }) => (
    <div className="dish-card">
        <div className="dish-image">
            <div className="placeholder">
                <span className="ph-emoji">{dish.emoji}</span>
            </div>
            <div className="dish-tags">
                {dish.tags.map(t => (
                    <span key={t} className={`dish-tag ${t}`}>{t.toUpperCase()}</span>
                ))}
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

export default DishCard;
