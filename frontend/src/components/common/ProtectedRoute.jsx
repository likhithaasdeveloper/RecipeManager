import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

// Redirects unauthenticated users to /login, and checks allowed roles
export const ProtectedRoute = ({ allowedRoles }) => {
  const user = authService.getCurrentUser();

  // 1. Unauthenticated -> Redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role Unauthorized -> Redirect to Unauthorized / 403 Page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Authorized -> Render Child Routes
  return <Outlet />;
};

// Redirects ALREADY LOGGED IN users away from /login and /register
export const PublicOnlyRoute = ({ children }) => {
  const user = authService.getCurrentUser();

  if (user) {
    return user.role === 'ADMIN' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/dashboard" replace />;
  }

  return children;
};