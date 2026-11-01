import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../store';
import type { RootState } from '../../store'; // Вынесено в отдельный type-импорт

export const Notification: React.FC = () => {
  const notification = useSelector((state: RootState) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => dispatch(clearNotification()), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px',
      backgroundColor: '#333', color: '#fff', padding: '12px 24px',
      borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000, fontSize: '14px'
    }}>
      {notification}
    </div>
  );
};
