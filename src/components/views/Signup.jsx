import React,{useState,useContext,useEffect} from 'react';
import { commonContainer, clearNotification } from '../globalFunctions/functions';
import { Container, OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem, Box, Button, Divider, Alert, FormHelperText,Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Signup = ({ handleClose }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const {getAllUsers} = useContext(UserContext);
	const isSignupPage = location.pathname === '/';
	const [showPassword, setShowPassword] = useState(false);
	const [formValues,setFormValues] = useState({username:'',email:'',password:'',role:''});
	const [error,setError]= useState({show:false,type:'',message:''});
	const [passwordError, setPasswordError] = useState('');

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	useEffect(()=>{
		clearNotification(error,setError);
	},[error])

	const validatePassword = (password)=>{
		const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		if (password.length === 0) {
			return ''; 
		}
		return passwordRegex.test(password)
			? ''
			: 'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.';
	}

	const handleChange= (e)=>{
		let {name,value} = e.target;
		setFormValues((prev)=>({...prev,[name]:value}));
		if(name=== 'password'){
			const passwordValidationMessage = validatePassword(value);
			setPasswordError(passwordValidationMessage);
		}
	}

	const handleSubmit =async (e)=>{
		e.preventDefault();
		if (passwordError) {
			return;
		}
		try{
			const response = await axios.post('/api/auth/signup', formValues);
			setError({show:true,type:'success',message:isSignupPage?response.data.message:'New user added successfully!'});
			setFormValues({ username: '', email: '', password: '', role: '' });
			 if (handleClose) {
				setTimeout(()=>{
          handleClose();
					getAllUsers();
				},3000)
      }
		 return	isSignupPage?
		 setTimeout(()=>{
         navigate('/login');
			},4000) :null
		}catch(err){
			if (err.response) {
				setError({ show: true, type: 'error', message: err.response.data.message });
		}
	}
	}
	return (
		<Container maxWidth='xs' className='py-4 mt-16 bg-customBg'>
			{
				isSignupPage&&commonContainer('signup')
			}
			{error.show&&
			  <Alert severity={error.type} className='mt-2 mb-4'>{error.message}</Alert>
			}
			{
				!isSignupPage&&
				 <Typography id="modal-modal-title" variant="h5" component="h2" className='py-3 text-center'>
             Add User
          </Typography>
			}
				<form onSubmit={handleSubmit}>
				<FormControl
				 size='small'
				 sx={{ mb: 2 }}
				 fullWidth
				>
				 <InputLabel htmlFor="username">Username</InputLabel>
					<OutlinedInput
						label="Username"
						id='username'
						type='text'
						name='username'
						onChange={handleChange}
						value={formValues.username}
						required
					/>
				</FormControl>
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
					   error={!!passwordError}
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
					{passwordError && <FormHelperText>{passwordError}</FormHelperText>}
					</FormControl>
					<FormControl
					size='small'
					sx={{ mb: 2 }}
					fullWidth
					>
					 <InputLabel id="role-label">Role</InputLabel>
					 <Select
						labelId="role-label"
						id='role'
						name='role'
						label="Role"
						onChange={handleChange}
						value={formValues.role}
						required
					 >
						<MenuItem value="Admin" disabled={!isSignupPage}>Admin</MenuItem>
						<MenuItem value="User">User</MenuItem>
					 </Select>
					</FormControl>
					 <Box className='flex flex-col gap-y-2'>
						<Button type='submit' variant='contained' sx={{ textTransform: 'none', background: '#000' }} fullWidth>{isSignupPage?'Sign Up':'Add User'}</Button>
						{
							isSignupPage&&
							<>
	          <Divider className='py-3 font-semibold'>Already have an account?</Divider>
						<Button variant='contained' sx={{ textTransform: 'none', background: '#000' }} onClick={() => navigate('/login')} fullWidth> Login</Button>
							</>
						}
					
				</Box>
				</form>
		</Container>
	)
}

export default Signup