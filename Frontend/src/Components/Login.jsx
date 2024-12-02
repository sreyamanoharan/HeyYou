import axios from '../axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post('/login', { email, password });
      const { user, token } = data;

      if (status === 201) {
        // Save user and token to localStorage
        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.setItem('token', token);

        toast.success('Login successful! Redirecting to chats...');

        // Redirect to chat page
        navigate('/chats');
      } else {
        toast.error('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Toaster toastOptions={{ duration: 3000 }} />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-10 max-w-sm flex flex-col items-center"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: '120px' }}>
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              HeyYou
            </h1>
            <p>Brings Your People Closer.....</p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src="/images/heyYou.webp"
            height={500}
            style={{ marginLeft: '100px' }}
            alt="HeyYou"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              left: '50%',
              width: '300px',
              marginRight: '300px',
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Login
            </h2>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '16px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: 'red',
                color: 'white',
                width: '300px',
                marginTop: '3px',
              }}
              fullWidth
            >
              Login
            </Button>

            <p>
              Don’t have an account?{' '}
              <Link to={'/register'} style={{ color: 'cyan' }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
