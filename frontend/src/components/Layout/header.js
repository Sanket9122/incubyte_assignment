import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Header = () => {
  const { isLoggedIn, logout, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <StorefrontIcon sx={{ mr: 1 }} />
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'underline', color: 'black' }}
        >
          kaka halwai
        </Typography>

        <Box>
          {isAdmin && (
            <Button color="inherit" component={RouterLink} to="/admin">
              kaka ka hisaab
            </Button>
          )}

          {isLoggedIn ? (
            <>
              <Typography variant="caption" sx={{ mr: 2 }}>
                Welcome, {user.username.split('@')[0]}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login / Register
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;