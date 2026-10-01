import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { loginSchema } from '../utils/validationSchemas';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('role') === 'admin';

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', 
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const response = await authService.login(data);
      setApiError(''); 
      
      if (response.user?.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setApiError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#111827' }}>
        {isAdminLogin ? 'Admin Portal Login' : 'Welcome Back'}
      </h2>
      <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        {isAdminLogin ? 'System Administrator Access' : 'Sign in to access your recipe account'}
      </p>
      
      {/* PERMANENT BACKEND ERROR BANNER */}
      {apiError && (
        <div style={{
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          backgroundColor: '#FEE2E2',
          border: '1.5px solid #EF4444',
          color: '#991B1B',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          register={register} 
          error={errors.email?.message} 
          autoFocus={true} 
        />
        <Input 
          label="Password" 
          type="password" 
          name="password" 
          register={register} 
          error={errors.password?.message} 
        />

        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Login'}
          </Button>
        </div>
      </form>

      
      {!isAdminLogin && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#4B5563' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
            Register here
          </Link>
        </div>
      )}

    
      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem' }}>
        <Link to="/" style={{ color: '#6B7280', textDecoration: 'underline' }}>
          ← Back to Portal Selection
        </Link>
      </div>
    </div>
  );
};        