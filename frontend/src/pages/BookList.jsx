import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { Book as BookIcon, Person as PersonIcon, Info as InfoIcon } from '@mui/icons-material';
import { getLoggedInUser } from '../utils/auth';



export default function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const user = getLoggedInUser();


  const fetchBooks = async () => {
    try {
      const res = await axios.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert('Please login again');
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;
    try {
      await axios.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      alert("Book deleted successfully");
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: '2rem'}}>
        <Typography variant="h5" gutterBottom sx={{textAlign:'center'}}>
  Welcome {user}!
</Typography>

      <Typography variant="h4" gutterBottom sx={{marginTop:'50px'}}>My Books</Typography>
      <br />
      {books.length === 0 ? (
  <Typography variant="body1" sx={{ mt: 4, color: 'gray' }}>
    You have no books yet. <Link to="/add-book">Add your first book</Link>.
  </Typography>
) : (
  <Grid container spacing={2} style={{ marginTop: '1rem' }}>
    {books.map((book) => (
      <Grid item xs={12} sm={6} md={4} key={book.id}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BookIcon sx={{ mr: 1 }} />
              <strong>Title:</strong>&nbsp;{book.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon sx={{ mr: 1 }} />
              <strong>Author:</strong>&nbsp;{book.author}
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoIcon sx={{ mr: 1 }} />
              <strong>Description:</strong>&nbsp;{book.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>
            <Button size="small" color="error" onClick={() => handleDelete(book.id)}>Delete</Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
)}

    </div>
  );
}
