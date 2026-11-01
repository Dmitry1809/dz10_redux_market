import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductStats } from '../../store';

export const ProductStats: React.FC = () => {
  const stats = useSelector(selectProductStats);

  return (
    <div style={{ background: '#f5f5f7', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div><b>Всего товаров:</b> {stats.total}</div>
      <div><b>В наличии:</b> {stats.available}</div>
      <div><b>Со скидкой:</b> {stats.withDiscount}</div>
      <div><b>Ср. рейтинг:</b> {stats.avgRating.toFixed(1)} ★</div>
    </div>
  );
};
