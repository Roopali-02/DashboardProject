import React,{useState} from 'react';
import { Box, Container, List, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton, Badge, Modal } from '@mui/material';
import { DashboardCustomize, Settings, VerifiedUser, PersonAdd, AccountBox, ArrowDropUp, ArrowDropDown, Logout, Email, Notifications } from '@mui/icons-material';
import Signup from '../views/Signup';
import { Link, Outlet } from 'react-router-dom';

const BarsLayout = () => {
const [open, setOpen] = useState(true);
const [openModal,setOpenModal] = useState(false);
const handleClick = () => {
		setOpen(!open);
	};

	const icons = [{ icon: <Email />, count: 4 }, { icon: <Notifications />, count: 6 }]
	const sidebarOptions = [
		{

			title:'Overview',
			icon:<DashboardCustomize/>,
			url:'/dashboard'
		},
		 {

			title:'User Management',
			icon:<VerifiedUser/>,
			children:[
				{
					title:'View Users',
					icon:<AccountBox/>,
					url: '/users'
				},
				 {
					title:'Add User',
					icon:<PersonAdd/>,
				}
			]
		},
		{
			title:'Settings',
			icon:<Settings/>,
			url:'/settings'
		},
		{
			title: 'LogOut',
			icon: <Logout />,
			url: '/logout'
		},
	]

	const handleOpen = ()=>{
		setOpenModal(true);
	}
	const handleClose = () => {
		setOpenModal(false);
	}

	return (
		<div>
		 <Box className="w-full bg-customBg shadow-lg">
			 <Container maxWidth='lg' className='h-20 navbarBg flex justify-between items-center sticky top-0 shadow-lg'>
				 <Box className='text-2xl font-semibold font-serif underline'>Dashboard</Box>
					<Box>
							{
								icons.map((item)=>(
									<IconButton size="large" color="primary" key={item.icon}>
										<Badge badgeContent={item.count} color="error">
										{item.icon}
										</Badge>
									</IconButton>
								))
							}
					</Box>
			 </Container>
				<Container maxWidth='lg' className='bg-slate-50 text-white flex'>
				 <Box className='sidebarBg w-[260px] p-2' sx={{ minHeight: 'calc(100vh - 80px)' }} >
					<List
						component="nav"
					>
           {
								sidebarOptions.map((option,index)=>(
									<Box key={index}>
									 <ListItemButton onClick={index === 1 ? handleClick : null} component={Link} to={option.url}>
										<ListItemIcon sx={{color:'#fff',minWidth:'40px !important'}}>{option.icon}</ListItemIcon>
											<ListItemText primary={option.title} className='sidebarTitle'/>
										{
												open && index === 1 ? <ArrowDropUp />:null
										}
										{
												!open && index === 1 ? <ArrowDropDown /> : null
										}
									</ListItemButton>
									{
										index===1&&
											<Collapse in={open} timeout="auto" unmountOnExit>
													<List component="div" disablePadding>
														{
															option.children.map((nestedOp,index)=>(
																<ListItemButton sx={{ pl: 4 }} component={Link} to={nestedOp.url} onClick={index === 1 ? handleOpen :null}>
																	<ListItemIcon sx={{ color: '#fff', minWidth: '40px !important' }}>{nestedOp.icon}</ListItemIcon>
																	<ListItemText primary={nestedOp.title} className='sidebarTitle' />
																</ListItemButton>
															))
														}
													</List>
											</Collapse>
									}
									</Box>
								))
					 }
					</List>
				 </Box>
					<Box className='grow overViewBg p-2'>
						<Outlet/>
				 </Box>
				 {
					openModal&&
						<Modal 
							open={openModal}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
						>
							<Signup handleClose={handleClose} />
						</Modal>
				 }
			 </Container>
		 </Box>
		</div>
	)
}

export default BarsLayout