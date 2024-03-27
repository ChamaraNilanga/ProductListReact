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
import { registerUser } from '../../Service/axiosService';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutline } from '@mui/icons-material';
import { useUserContext } from '../../ContextApi/UserContext';

const defaultTheme = createTheme();

export default function SignUp() {
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const { userName, setUserName } = useUserContext();

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log(data);
		const emailUser = data.get('email');
		const requestBody = {
			email: data.get('email'),
			password: data.get('password'),
			name: data.get('firstName') + ' ' + data.get('lastName'),
			phone: data.get('phone'),
		};
		try {
			const response = await registerUser(requestBody);
			console.log(response);
			if (response.status === 201 || response.status === 200) {
				setMessage('User registered successfully');
				setMessageType('success');
				setUserName(emailUser);
				setTimeout(() => {
					setMessage('');
					navigate('/login');
				}, 3000);
			}
			console.log(response);
		} catch (error) {
			console.error(error.response.data);
			setMessage(error.response.data.message || 'Something went wrong');
			setMessageType('error');
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			{message != '' && (
				<Alert
					icon={<CheckCircleOutline fontSize="inherit" />}
					severity={messageType}
				>
					{message}
				</Alert>
			)}
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
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="phone"
									label="Phone"
									name="phone"
									autoComplete="phone"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
