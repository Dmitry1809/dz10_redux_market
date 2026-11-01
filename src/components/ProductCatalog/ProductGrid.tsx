import React from 'react';
import { useSelector } from 'react-redux';
import { selectSortedProducts } from '../../store';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const sortedProducts = useSelector(selectSortedProducts);

  return (
    <div>
      <div style={{ marginBottom: '10px', color: '#555', fontSize: '14px' }}>
        Показано товаров: {sortedProducts.length}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
