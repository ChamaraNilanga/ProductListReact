import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../CopyRight/CopyRight';
import { useUserContext } from '../../ContextApi/UserContext';
import { loginUser } from '../../Service/axiosService';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignIn() {
    const { userName , setUserName } = useUserContext();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const setItemsToLocalStorage = (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    }

    const navigatePage = (role) => {
        if(role === 'admin'){
            navigate('/dashboard');
        } else {
            navigate('/profile');
        }
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const requestBody = {
        email: data.get('email'),
        password: data.get('password')
    }
    try {
        const response = await loginUser(requestBody);
        if( response.status === 200){
            setMessage('User logged successfully');
            setMessageType('success');
            setItemsToLocalStorage('token', response.data.token);
            setItemsToLocalStorage('userId', response.data.userId);
            setTimeout(() => {
                setMessage('');
                navigatePage('admin');
            }, 3000);
        }
        console.log(response);
    } catch (error) {
        console.error(error);
        setMessage(error.response.data.message || 'User login failed');
        setMessageType('error');
    }
  };

  const setUserNameValue = (userName) => {
    setUserName(userName);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
        {message != "" && <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity={messageType}>
            {message}
        </Alert>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userName}
              onChange={(e) => setUserNameValue(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}