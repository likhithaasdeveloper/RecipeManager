import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { loginSchema } from '../utils/validationSchemas';
import { authService } from '../services/authService';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('role') === 'admin';
  const isExpired = searchParams.get('expired') === 'true';

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // SHOW / HIDE PASSWORD STATE

  const passwordRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { ref: emailRegisterRef, ...emailRegisterRest } = register('email');
  const { ref: passwordRegisterRef, ...passwordRegisterRest } = register('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(''); 
    
    try {
      const response = await authService.login(data);
      const user = authService.getCurrentUser();
      
      const role = (user?.role || response?.user?.role || response?.role || '')
        .toString()
        .toUpperCase()
        .replace('ROLE_', '');

      if (isAdminLogin || role === 'ADMIN') {
        navigate('/admin/approvals', { replace: true });
      } else if (role === 'CREATOR') {
        navigate('/creator/create', { replace: true });
      } else if (role === 'USER') {
        navigate('/user/recipes', { replace: true });
      } else {
        navigate('/user/recipes', { replace: true });
      }
    } catch (error) {
      setApiError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif'
    }}>
      {/* BACK TO PORTAL BUTTON */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.4rem 0.8rem',
            backgroundColor: '#F3F4F6',
            color: '#374151',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.8rem'
          }}
        >
          ← Back to Portal
        </button>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#111827' }}>
        {isAdminLogin ? 'Admin Portal Login' : 'Welcome Back'}
      </h2>
      <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        {isAdminLogin ? 'System Administrator Access' : 'Sign in to access your recipe account'}
      </p>

      {isExpired && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #F59E0B',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          Your session has expired. Please log in again to continue.
        </div>
      )}

      {apiError && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* EMAIL FIELD */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem' }}>
            Email
          </label>
          <input
            type="email"
            {...emailRegisterRest}
            ref={emailRegisterRef}
            onKeyDown={handleEmailKeyDown}
            placeholder="Enter email address"
            style={{
              width: '100%',
              padding: '0.65rem 0.75rem',
              borderRadius: '6px',
              border: errors.email ? '1.5px solid #EF4444' : '1px solid #D1D5DB',
              outline: 'none',
              boxSizing: 'border-box',
              fontSize: '0.9rem'
            }}
          />
          {errors.email && (
            <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.3rem', display: 'block' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* PASSWORD FIELD WITH SHOW/HIDE TOGGLE */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem' }}>
            Password
          </label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              {...passwordRegisterRest}
              ref={(e) => {
                passwordRegisterRef(e);
                passwordRef.current = e;
              }}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '0.65rem 3rem 0.65rem 0.75rem',
                borderRadius: '6px',
                border: errors.password ? '1.5px solid #EF4444' : '1px solid #D1D5DB',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '0.9rem'
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
            <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '0.3rem', display: 'block' }}>
              {errors.password.message}
            </span>
          )}
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
          {loading ? 'Verifying...' : 'Login'}
        </button>
      </form>

      {!isAdminLogin && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#4B5563' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
            Register here
          </Link>
        </div>
      )}
    </div>
  );
};