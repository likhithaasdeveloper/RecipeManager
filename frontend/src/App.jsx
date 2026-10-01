import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { RecipeBrowser } from './pages/RecipeBrowser';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { ProtectedRoute, PublicOnlyRoute } from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* PUBLIC LANDING & GALLERY */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipes" element={<RecipeBrowser />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* PUBLIC ONLY ROUTES (Logged-in users get redirected away) */}
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

      {/* PROTECTED ROUTES FOR ANY AUTHENTICATED USER */}
      <Route element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* STRICT ROLE-BASED ROUTE (ADMIN ONLY) */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;