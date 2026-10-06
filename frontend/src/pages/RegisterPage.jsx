import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from '../utils/validationSchemas';
import { authService } from '../services/authService';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Show / Hide Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Field Refs for Sequential Enter-key Navigation
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Live feedback while typing
  });

  const { ref: nameRef, ...nameRest } = register('name');
  const { ref: emailRegisterRef, ...emailRest } = register('email');
  const { ref: passwordRegisterRef, ...passwordRest } = register('password');
  const { ref: confirmPasswordRegisterRef, ...confirmPasswordRest } = register('confirmPassword');

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');

    try {
      const { confirmPassword, ...payload } = data;
      await authService.register(payload);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setApiError('Registration failed. Email might already be taken.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111827' }}>Create Account</h2>

      {apiError && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* FULL NAME */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
            Full Name
          </label>
          <input
            type="text"
            {...nameRest}
            ref={nameRef}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            placeholder="John Doe"
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '6px',
              border: errors.name ? '1.5px solid #EF4444' : '1px solid #D1D5DB',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.name && (
            <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.name.message}
            </span>
          )}
        </div>

        {/* EMAIL */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
            Email Address
          </label>
          <input
            type="email"
            {...emailRest}
            ref={(e) => {
              emailRegisterRef(e);
              emailRef.current = e;
            }}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            placeholder="john@example.com"
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '6px',
              border: errors.email ? '1.5px solid #EF4444' : '1px solid #D1D5DB',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && (
            <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* PASSWORD WITH SHOW/HIDE TOGGLE */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
            Password
          </label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              {...passwordRest}
              ref={(e) => {
                passwordRegisterRef(e);
                passwordRef.current = e;
              }}
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
              placeholder="Min 8 chars (1 upper, 1 lower, 1 special)"
              style={{
                width: '100%',
                padding: '0.6rem 3rem 0.6rem 0.75rem',
                borderRadius: '6px',
                border: errors.password ? '1.5px solid #EF4444' : '1px solid #D1D5DB',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* CONFIRM PASSWORD WITH SHOW/HIDE TOGGLE */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
            Confirm Password
          </label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...confirmPasswordRest}
              ref={(e) => {
                confirmPasswordRegisterRef(e);
                confirmPasswordRef.current = e;
              }}
              placeholder="Re-enter password"
              style={{
                width: '100%',
                padding: '0.6rem 3rem 0.6rem 0.75rem',
                borderRadius: '6px',
                border: errors.confirmPassword ? '1.5px solid #EF4444' : '1px solid #D1D5DB',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* ACCOUNT TYPE */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
            Account Type
          </label>
          <select
            {...register('role')}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          >
            <option value="CREATOR">Recipe Creator</option>
            <option value="USER">End User (Browse & Save)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#2563EB',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
          Log in
        </Link>
      </div>
    </div>
  );
};