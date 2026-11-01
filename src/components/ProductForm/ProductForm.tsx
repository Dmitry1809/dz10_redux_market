import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { 
  setFormField, addFeature, removeFeature, 
  validateForm, addProduct, clearForm, setSubmitting, showNotification, validateProductForm,
  type RootState // Добавлено ключевое слово type перед RootState
} from '../../store';
import { RatingInput } from './RatingInput';
import { FeatureInput } from './FeatureInput';

export const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const categories = useSelector((state: RootState) => state.products.categories);

  const changeField = (field: string, value: unknown) => {
    dispatch(setFormField(field, value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(validateForm());
    
    const errors = validateProductForm(form);
    if (Object.keys(errors).length > 0) return;

    dispatch(setSubmitting(true));

    // Имитация асинхронной загрузки/сохранения
    setTimeout(() => {
      const priceNum = Number(form.price);
      const originalPriceNum = form.originalPrice ? Number(form.originalPrice) : undefined;

      const newProduct = {
        id: nanoid(),
        name: form.name,
        price: priceNum,
        originalPrice: originalPriceNum,
        category: form.category,
        brand: form.brand,
        rating: form.rating,
        reviewsCount: Number(form.reviewsCount) || 0,
        available: form.available,
        description: form.description,
        features: form.features,
        isNew: true,
        hasDiscount: !!originalPriceNum && originalPriceNum > priceNum
      };

      dispatch(addProduct(newProduct));
      dispatch(clearForm());
      dispatch(showNotification('Товар успешно добавлен в каталог!'));
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h3>Добавление товара</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input placeholder="Название товара *" value={form.name} onChange={e => changeField('name', e.target.value)} style={{ width: '100%', padding: '8px' }} />
        {form.errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{form.errors.name}</span>}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
          <input placeholder="Цена *" value={form.price} onChange={e => changeField('price', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          {form.errors.price && <span style={{ color: 'red', fontSize: '12px' }}>{form.errors.price}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <input placeholder="Старая цена (скидка)" value={form.originalPrice} onChange={e => changeField('originalPrice', e.target.value)} style={{ width: '100%', padding: '8px' }} />
          {form.errors.originalPrice && <span style={{ color: 'red', fontSize: '12px' }}>{form.errors.originalPrice}</span>}
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <select value={form.category} onChange={e => changeField('category', e.target.value)} style={{ width: '100%', padding: '8px' }}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input placeholder="Бренд *" value={form.brand} onChange={e => changeField('brand', e.target.value)} style={{ width: '100%', padding: '8px' }} />
        {form.errors.brand && <span style={{ color: 'red', fontSize: '12px' }}>{form.errors.brand}</span>}
      </div>

      <RatingInput value={form.rating} onChange={val => changeField('rating', val)} />
      
      <div style={{ marginBottom: '10px' }}>
        <input type="number" placeholder="Количество отзывов" value={form.reviewsCount} onChange={e => changeField('reviewsCount', e.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label><input type="checkbox" checked={form.available} onChange={e => changeField('available', e.target.checked)} /> В наличии</label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea placeholder="Описание товара *" value={form.description} onChange={e => changeField('description', e.target.value)} style={{ width: '100%', padding: '8px', minHeight: '60px' }} />
        {form.errors.description && <span style={{ color: 'red', fontSize: '12px' }}>{form.errors.description}</span>}
      </div>

      <FeatureInput features={form.features} onAdd={f => dispatch(addFeature(f))} onRemove={i => dispatch(removeFeature(i))} />

      <button type="submit" disabled={form.isSubmitting} style={{ width: '100%', padding: '10px', background: '#fc0', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
        {form.isSubmitting ? 'Сохранение...' : 'Добавить товар'}
      </button>
    </form>
  );
};
