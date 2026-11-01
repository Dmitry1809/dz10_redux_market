import React from 'react';
import type { Product } from '../../store'; // Добавлено ключевое слово type
import { Badge } from '../UI/Badge';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div style={{
      border: '1px solid #e3e3e3', borderRadius: '8px', padding: '16px',
      position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div>
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
          {product.isNew && <Badge type="new" text="Новинка" />}
          {product.hasDiscount && <Badge type="discount" text={`-${discountPercent}%`} />}
          {!product.available && <Badge type="unavailable" text="Нет в наличии" />}
        </div>

        <div style={{ height: '160px', background: '#f6f6f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#aaa' }}>
          <span>Изображение товара</span>
        </div>

        <div style={{ fontSize: '12px', color: '#777', marginBottom: '4px' }}>{product.brand} · {product.category}</div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', lineHeight: '1.3', color: '#222' }}>{product.name}</h4>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#ff9900', marginBottom: '12px' }}>
          <span>★ {product.rating}</span>
          <span style={{ color: '#777' }}>({product.reviewsCount} отзывов)</span>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111' }}>{product.price.toLocaleString()} ₽</span>
          {product.originalPrice && (
            <span style={{ fontSize: '14px', color: '#999', textDecoration: 'line-through' }}>{product.originalPrice.toLocaleString()} ₽</span>
          )}
        </div>
        
        <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {product.description}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {product.features.map(f => (
            <span key={f} style={{ background: '#f0f2f5', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', color: '#444' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
