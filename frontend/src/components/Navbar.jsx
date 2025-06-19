import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#1976d2',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" color="white">
        BOOK MANAGEMENT SYSTEM
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {isLoggedIn ? (
          <>
            <Button
              component={Link}
              to="/"
              color="inherit"
              variant="text"
            >
              My Books
            </Button>
            <Button
              component={Link}
              to="/add-book"
              color="inherit"
              variant="text"
            >
              Add Book
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              sx={{ marginRight: 2 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              color="inherit"
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
