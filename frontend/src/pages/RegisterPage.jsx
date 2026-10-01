import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from '../utils/validationSchemas';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { authService } from '../services/authService';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setApiError('');
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      await authService.register(payload);
      reset();
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#111827' }}>Create an Account</h2>
      <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        Join us to create, manage, or explore recipes
      </p>
      
      {apiError && (
        <div style={{
          padding: '0.75rem 1rem',
          marginBottom: '1.25rem',
          backgroundColor: '#FEE2E2',
          border: '1px solid #FCA5A5',
          color: '#991B1B',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          label="Full Name" 
          name="name" 
          register={register} 
          error={errors.name?.message} 
          autoFocus={true} 
        />
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          register={register} 
          error={errors.email?.message} 
        />
        <Input 
          label="Password" 
          type="password" 
          name="password" 
          register={register} 
          error={errors.password?.message} 
        />
        <Input 
          label="Confirm Password" 
          type="password" 
          name="confirmPassword" 
          register={register} 
          error={errors.confirmPassword?.message} 
        />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
        </div>
      </form>

     
      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#4B5563' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
          Login here
        </Link>
      </div>

      
      <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem' }}>
        <Link to="/" style={{ color: '#6B7280', textDecoration: 'underline' }}>
          ← Back to Portal Selection
        </Link>
      </div>
    </div>
  );
};