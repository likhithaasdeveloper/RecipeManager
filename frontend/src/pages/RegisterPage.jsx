import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/validationSchemas';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset, // 1. Grab the reset function here
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Registration Submitted:', data);
    alert('Account created successfully!');
    reset(); // 2. Call reset() to clear all fields!
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111827' }}>Create an Account</h2>
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
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};