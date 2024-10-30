import React, { useState ,useEffect,useContext} from 'react';
import { commonContainer, clearNotification } from '../globalFunctions/functions';
import { Container, OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel, Box, Button, Divider, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../context/UserContext';


const Login = () => {
	const navigate = useNavigate();
	const {setCurrentUser,login} = useContext(UserContext);
	const [showPassword, setShowPassword] = useState(false);
	const [formValues,setFormValues] = useState({email:'',password:''});
	const [error, setError] = useState({ show: false, type: '', message: '' });
	const handleClickShowPassword = () => setShowPassword((show) => !show);


	useEffect(()=>{
		clearNotification(error, setError);
	},[error])

	const handleChange = (e)=>{
		const {name,value}=e.target;
		setFormValues((prev)=>({...prev,[name]:value}));
	}

	const handleSubmit = async(e)=>{
		e.preventDefault();
		try{
			const response = await axios.post('/api/auth/login', formValues);
			setError({show:true,type:'success',message:response.data.message});
			setFormValues({email:'',password:''});
			setCurrentUser(response.data.user); 
			login(response.data.user);
			setTimeout(()=>{
         navigate('/dashboard');
			},5000)
		}catch(err){
      console.log(err);
			if (err.response) {
				const errorMessage = err.response.data.message || 'An unexpected error occurred. Please try again.';
				setError({ show: true, type: 'error', message: errorMessage });
			} else {
				setError({ show: true, type: 'error', message: 'An unexpected error occurred. Please try again.'});
			}
		}
	}

	return (
		<Container maxWidth='xs' className='py-4 mt-16 bg-customBg'>
		 {
				commonContainer('login')
			}
			{error.show &&
				<Alert severity={error.type} className='mt-2 mb-4'>{error.message}</Alert>
			}
			<form onSubmit={handleSubmit}>
				<FormControl
					size='small'
					sx={{ mb: 2 }}
					fullWidth
				>
					<InputLabel htmlFor="email">Email</InputLabel>
					<OutlinedInput
						id='email'
						type='email'
						name='email'
						onChange={handleChange}
						value={formValues.email}
						label="Email"
						required
					/>
				</FormControl>
				<FormControl
					size='small'
					sx={{ mb: 2 }}
					fullWidth
				>
					<InputLabel htmlFor="password">Password</InputLabel>
					<OutlinedInput
						id='password'
						type={showPassword ? 'text' : 'password'}
						name='password'
						label="Password"
						onChange={handleChange}
						value={formValues.password}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						required
					/>
				</FormControl>

				<Box className='flex flex-col gap-y-2'>
					<Button type='submit' variant='contained' sx={{ textTransform: 'none', background: '#000' }} fullWidth> Login</Button>
					<Divider className='py-3 font-semibold'>Dont have an account?</Divider>
					<Button variant='contained' sx={{ textTransform: 'none', background: '#000' }} onClick={() => navigate('/')} fullWidth> Sign Up</Button>
				</Box>

			</form>
		</Container>
	)
}

export default Login