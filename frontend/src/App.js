import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          
        <Route
          path="/"
          element={
            <RequireAuth>
              <BookList />
            </RequireAuth>
          }
        />
        <Route
          path="/add-book"
          element={
            <RequireAuth>
              <AddBook />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <RequireAuth>
              <EditBook />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
     
    </Router>
  );
}

export default App;
