import React, { useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
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

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.access_token);
      toast.success('Login successful!',{
        position: 'top-center',
        autoClose: 2000,
      });
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      toast.error('Invalid credentials',{
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5' }}>
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
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
              Login
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" mt={3} textAlign="center">
          Don't have an account?
        </Typography>

        <Box mt={1} textAlign="center">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Go to Register</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
