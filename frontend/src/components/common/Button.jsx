import React from 'react';

export const Button = ({ children, type = 'button', onClick, disabled, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: disabled ? '#9CA3AF' : '#2563EB',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        ...style
      }}
    >
      {children}
    </button>
  );
};