import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../store';
import type { RootState } from '../../store';

export const SortControls: React.FC = () => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder } = useSelector((state: RootState) => state.ui);

  const handleSortChange = (field: 'name' | 'price' | 'rating') => {
    const order = (sortBy === field && sortOrder === 'asc') ? 'desc' : 'asc';
    dispatch(setSort(field, order));
  };

  const getArrow = (field: string) => {
    if (sortBy !== field) return '';
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
      <span>Сортировать:</span>
      {(['price', 'rating', 'name'] as const).map(field => (
        <button 
          key={field} 
          onClick={() => handleSortChange(field)}
          style={{
            padding: '6px 12px', border: '1px solid #ddd', borderRadius: '4px',
            background: sortBy === field ? '#fc0' : '#fff', cursor: 'pointer', fontWeight: sortBy === field ? 'bold' : 'normal'
          }}
        >
          {field === 'price' ? 'По цене' : field === 'rating' ? 'По рейтингу' : 'По названию'}
          {getArrow(field)}
        </button>
      ))}
    </div>
  );
};
