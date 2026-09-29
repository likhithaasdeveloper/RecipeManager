import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validationSchemas';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset, // 1. Grab reset
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Login Submitted:', data);
    alert('Logged in successfully!');
    reset(); // 2. Clear fields after login submit
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111827' }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};