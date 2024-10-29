import React,{useState,useEffect,useContext} from 'react';
import { Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Chip, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button,Alert } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import {Edit,Delete} from '@mui/icons-material';
import { clearNotification } from '../globalFunctions/functions';
import { UserContext } from '../context/UserContext';
const Users = () => {
	const { users, getAllUsers } = useContext(UserContext);

	const [open,setOpen] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const [userId,setUserId] = useState('');
	const [error,setError] = useState({show:false,type:'',message:''});

	useEffect(()=>{
		getAllUsers();
	},[])
	useEffect(()=>{
		clearNotification(error, setError);
	}, [error])

	//Open/Close Modal
	const handleClickOpen = (id) => { setOpen(true); setUserId(id)}
	const handleClose = () => setOpen(false);

	
  //Pagination functions
	const handleChangePage = (event, newPage)=>{
		setPage(newPage);
	}
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	//Delete selected User
	const deleteUser =async(id)=>{
      try{
			const response = 	await axios.delete(`/api/delete-user/${id}`);
			setOpen(false);
			getAllUsers();
			setError({show:true,type:'success',message:response.data.message});
			console.log(response);
			}catch(err){
				console.log(err);
				setError({ show: true, type: 'error', message: err.response?.data?.message || 'Something went wrong' });
			}
	}

	const columns=['Id','UserName','Email','Role','Created On','Status','Actions'];
	
	return (
		<Box className='text-black'>
			<Box className='text-4xl font-medium tracking-wide text-cyan-700 font-serif mt-2 mb-3'>All Users</Box>
			{
				error.show&&<Alert variant="filled" severity={error.type} className='my-2'>{error.message}</Alert>
			}
			<TableContainer component={Paper}>
			 <Table aria-label="users table" size="small">
					<TableHead className='paginationBg'>
					 <TableRow>
					 {
							columns.map((columnHeader,index)=>(
								<TableCell key={index}>{columnHeader}</TableCell>
							))
					 }
					 </TableRow>
				 </TableHead>
				 <TableBody>
					{
						users.map((user,index)=>(
							<TableRow key={user._id}>
								 <TableCell>{index+1}</TableCell>
								 <TableCell>{user.username}</TableCell>
								 <TableCell>{user.email}</TableCell>
								 <TableCell>{user.role}</TableCell>
								 <TableCell>{dayjs(user.createdAt).format('DD/MM/YYYY')}</TableCell>
								 <TableCell><Chip size='small' label="Active" color="success" sx={{p:1}}/></TableCell>
									<TableCell>
										<Tooltip title='Edit'>
											<IconButton color="primary">
												<Edit/>
											</IconButton>
										</Tooltip>
										 <Tooltip title='Delete'>
										<IconButton color="primary" onClick={()=>handleClickOpen(user._id)}>
												<Delete/>
											</IconButton>
										 </Tooltip>
									</TableCell>
							</TableRow>
						))
					}
				 </TableBody>
			 </Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={users.length}
				rowsPerPageOptions={[10, 25, 100]}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className='paginationBg'
			/>
			{
				open&&
				<Dialog 
				  open={open}
					onClose={handleClose}
				>
						<DialogTitle sx={{p:'8px 16px !important'}}>Confirm</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Are you sure you want to delete this user?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} variant='contained' size='small'>Cancel</Button>
							<Button onClick={() => deleteUser(userId)} autoFocus variant='contained' size='small'>Okay</Button>
						</DialogActions>
				</Dialog>
			}
		</Box>
	)
}

export default Users