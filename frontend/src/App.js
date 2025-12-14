import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import HomePage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import AdminDashboard from './pages/admindashboard';
import { useAuth } from './context/AuthContext';
import { CircularProgress, Box } from '@mui/material'; 

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const LayoutWrapper = () => (
    <Layout>
        {/* Outlet renders the content of the matched child route (HomePage/AdminDashboard) */}
        <Outlet /> 
    </Layout>
);



const App = () => {
  return (
    <Routes>
        {/* 1. Login/Register route (outside the main layout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2. Layout Route: Uses LayoutWrapper to apply the header/footer to all children */}
        <Route element={<LayoutWrapper />}>
            
            {/* Home Page: path="/" is explicit */}
            <Route path="/" element={<HomePage />} /> 
            
            {/* Admin Dashboard: Protected and applied to the /admin path */}
            <Route 
                path="/admin" // Use absolute path here
                element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                } 
            />

            {/* Fallback Route: Redirects anything else to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  );
};

export default App;