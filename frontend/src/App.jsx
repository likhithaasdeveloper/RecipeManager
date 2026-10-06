import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RecipeBrowser } from './pages/RecipeBrowser';
import { SavedRecipes } from './pages/SavedRecipes';
import { AdminDashboard } from './pages/AdminDashboard';
import { CreateRecipe } from './pages/CreateRecipe';
import { MyRecipes } from './pages/MyRecipes';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { ProtectedRoute, PublicOnlyRoute } from './components/common/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

function App() {
  return (
    <Routes>
      {/* 1. PUBLIC GUEST BROWSE (WITHOUT SIDEBAR) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/recipes" element={<RecipeBrowser readOnly={false} />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* 2. GUEST AUTHENTICATION */}
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />

      {/* 3. LOGGED-IN WORKSPACE (WITH SIDEBAR DASHBOARD LAYOUT) */}
      <Route element={<ProtectedRoute allowedRoles={['USER', 'CREATOR', 'ADMIN']} />}>
        <Route element={<DashboardLayout />}>
          
          {/* END USER ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route path="/user/recipes" element={<RecipeBrowser readOnly={false} />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
          </Route>

          {/* CREATOR ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['CREATOR']} />}>
            <Route path="/creator/create" element={<CreateRecipe />} />
            <Route path="/creator/recipes" element={<RecipeBrowser readOnly={true} />} />
            <Route path="/creator/my-recipes" element={<MyRecipes />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/approvals" element={<AdminDashboard />} />
            <Route path="/admin/recipes" element={<RecipeBrowser readOnly={true} />} />
          </Route>

        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;