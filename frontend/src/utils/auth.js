import {jwtDecode} from 'jwt-decode';

export const getLoggedInUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.username || decoded.sub || null;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
