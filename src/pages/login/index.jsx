import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Box, Container, Paper, Stack, TextField } from '@mui/material';
import GoogleSVG from '../../assets/social/social-google.svg';
import SocialSVG from '../../assets/social/social-facebook.svg';
import DrawerAppBar from '../../components/app-bar';

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target);
    const email = 'iguim@a.com';
    const password = '123456';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat');
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <DrawerAppBar />
      <Container
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Paper sx={{ p: 4 }}>
          <span className="logo">Logo</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField type="email" placeholder="email" />
              <TextField type="password" placeholder="password" />
              <Stack direction="row" spacing={2}>
                <img src={GoogleSVG} alt="google" />
                <img src={SocialSVG} alt="google" />
              </Stack>
              <button>Sign in</button>
              {err && <span>Something went wrong</span>}
            </Stack>
          </form>
          <p>
            You don't have an account?{' '}
            <Link to="/login/register">Register</Link>
          </p>
        </Paper>
      </Container>
    </>
  );
}
