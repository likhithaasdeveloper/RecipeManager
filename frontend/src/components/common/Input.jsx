import React, { useState } from 'react';

export const Input = ({
  label,
  type = 'text',
  register,
  name,
  error,
  autoFocus = false,
  ...rest
}) => {
  
  const [showPassword, setShowPassword] = useState(false);

  
  const isPasswordType = type === 'password';

  // Handles moving to next input when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      if (form) {
        const index = Array.prototype.indexOf.call(form, e.target);
        const nextElement = form.elements[index + 1];
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };

  return (
    <div style={{ marginBottom: '1.2rem', display: 'flex', flexDirection: 'column' }}>
      {label && (
        <label style={{ marginBottom: '0.4rem', fontWeight: 'bold', color: '#374151' }}>
          {label}
        </label>
      )}

      {/* Wrapper container for relative positioning of the toggle button */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type={isPasswordType && showPassword ? 'text' : type}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          {...(register ? register(name) : {})}
          {...rest}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            paddingRight: isPasswordType ? '3rem' : '0.8rem', // leave room for Show/Hide text
            borderRadius: '6px',
            border: error ? '1.5px solid #ef4444' : '1px solid #d1d5db',
            outline: 'none',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />

       
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0.6rem',
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
              padding: '0.2rem 0.4rem',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {error && (
        <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.3rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};