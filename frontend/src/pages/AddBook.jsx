import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function AddBook() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!form.title || !form.author || !form.description) {
      toast.warn('Title,Author and Description are required!',{
        position:'top-center',
        autoClose:2000,
      });
      return;
      
    }
    try {
      await axios.post('/books', form);
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add book',{
        position:'top-center',
        autoClose:2000
      })
    }
  };

  return (
    
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={5}>
        <Typography variant="h5" mb={2}>Add New Book</Typography>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={form.author}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Book
        </Button>
      </Box>
    </Container>
  );
}
