import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

export const ProtectedRoute = ({ allowedRoles }) => {
  const user = authService.getCurrentUser();
  
  // STRICT GUEST CHECK
  if (!user || typeof user !== 'object' || !user.email) {
    return <Navigate to="/login" replace />;
  }

  const role = (user.role || '').toString().toUpperCase().replace('ROLE_', '');

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute = ({ children }) => {
  const user = authService.getCurrentUser();

  // ONLY REDIRECT IF A VALID LOGGED-IN USER EXISTS
  if (user && typeof user === 'object' && user.email) {
    const role = (user.role || '').toString().toUpperCase().replace('ROLE_', '');
    if (role === 'ADMIN') return <Navigate to="/admin/approvals" replace />;
    if (role === 'CREATOR') return <Navigate to="/creator/create" replace />;
    if (role === 'USER') return <Navigate to="/user/recipes" replace />;
  }

  return children;
};