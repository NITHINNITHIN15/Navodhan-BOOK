import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
  });
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const res = await axios.get('/books');
      const book = res.data.find((b) => b.id === id);
      if (book) {
        setForm({
          title: book.title,
          author: book.author,
          description: book.description || '',
        });
      } else {
        alert('Book not found');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.description) {
  toast.warn('Title,Author and Description are required!');
  return;
}
    try {
      await axios.put(`/books/${id}`, form);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to update book');
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={5}>
        <Typography variant="h5" mb={2}>Edit Book</Typography>
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
          Update Book
        </Button>
      </Box>
    </Container>
  );
}
