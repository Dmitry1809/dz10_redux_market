import React from 'react';

interface RatingInputProps {
  value: number;
  onChange: (val: number) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Рейтинг ({value}/5):</label>
      <input 
        type="range" min="1" max="5" step="0.1" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
    </div>
  );
};
