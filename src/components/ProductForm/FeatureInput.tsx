import React, { useState } from 'react';

interface FeatureInputProps {
  features: string[];
  onAdd: (feature: string) => void;
  onRemove: (idx: number) => void;
}

export const FeatureInput: React.FC<FeatureInputProps> = ({ features, onAdd, onRemove }) => {
  const [text, setText] = useState('');

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Особенности (теги):</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input 
          type="text" value={text} onChange={(e) => setText(e.target.value)} 
          placeholder="Например: 128GB" style={{ flex: 1, padding: '6px' }}
        />
        <button onClick={handleAdd} style={{ padding: '6px 12px', background: '#fc0', border: 'none', cursor: 'pointer' }}>Добавить</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {features.map((f, i) => (
          <span key={i} style={{ background: '#eee', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {f} <button onClick={() => onRemove(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'red', fontWeight: 'bold' }}>&times;</button>
          </span>
        ))}
      </div>
    </div>
  );
};
