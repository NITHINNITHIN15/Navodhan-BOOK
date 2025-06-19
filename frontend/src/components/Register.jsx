import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      toast.success('Registered successfully',{
              position: 'top-center',
              autoClose: 2000,
            });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5' }}>
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" mt={3} textAlign="center">
          Already have an account?
        </Typography>

        <Box mt={1} textAlign="center">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Go to Login</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
