import React from 'react';

interface BadgeProps {
  type: 'new' | 'discount' | 'unavailable';
  text: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, text }) => {
  const colors = {
    new: { bg: '#e5f5e7', text: '#1b6928' },
    discount: { bg: '#fff0f0', text: '#f91111' },
    unavailable: { bg: '#f2f2f2', text: '#7f7f7f' }
  };

  return (
    <span style={{
      backgroundColor: colors[type].bg,
      color: colors[type].text,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginRight: '6px'
    }}>
      {text}
    </span>
  );
};
