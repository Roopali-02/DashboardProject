import React,{useState,useContext,useEffect} from 'react';
import { Box, Container, IconButton, Badge, Modal,Drawer,Avatar,useMediaQuery,Tooltip } from '@mui/material';
import { DashboardCustomize, Settings, VerifiedUser, PersonAdd, AccountBox, Logout, Email, Notifications,AccountCircle ,Menu} from '@mui/icons-material';
import Signup from '../views/Signup';
import Sidebar from '../common/Sidebar';
import { Outlet } from 'react-router-dom';
import {UserContext} from '../context/UserContext';


const BarsLayout = () => {
	const smallSizeScreen = useMediaQuery('(max-width:500px)');
	const {currentUser,setCurrentUser} = useContext(UserContext);
	const [loading, setLoading] = useState(true); 
	const [open, setOpen] = useState(true);
	const [openModal,setOpenModal] = useState(false);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [sidebarDrawer, setSidebarDrawer] = useState(false);
	const addModal = true;

	const handleClick = () => {
			setOpen(!open);
		};

		useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  }, []);


	const icons = [{ icon: <Email />, count: 4,message:'You have 4 unread emails.' }, { icon: <Notifications />, count: 6,message:'You have 6 unread notifications.' }]
	const sidebarOptions = [
		{

			title:'Overview',
			icon:<DashboardCustomize/>,
			url:'/dashboard',
			toShow:'both',
		},
		 {

			title:'User Management',
			icon:<VerifiedUser/>,
			toShow:'admin',
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
			url:'/settings',
			toShow:'admin',
		},
		{
			title:'My Profile',
			icon:<AccountCircle/>,
			toShow:'user',
		},
		{
			title: 'LogOut',
			icon: <Logout />,
			url: '/login',
			toShow:'both',
		},
	]

	const handleOpen = ()=>{
		setOpenModal(true);
	}
	const handleClose = () => {
		setOpenModal(false);
	}

	const clearUser = ()=>{
    setCurrentUser(null);
		localStorage.removeItem('currentUser');
	}

	 if (loading) {
    return <div className='flex justify-center w-full min-h-screen items-center text-4xl font-bold'>Loading...</div>;
  }

	const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
	const toggleSidebarDrawer = (newOpen) => () => {
    setSidebarDrawer(newOpen);
  };

	const DrawerList = ()=>{
		return(
			<Box sx={{ width: 250 }}  role="presentation" className='flex items-center' onClick={toggleDrawer(false)}>
          <Box className='flex flex-col justify-start items-center w-full min-h-screen pt-12 profileDrawerBg'>
            <Avatar sx={{ bgcolor: '#008080' }}>{currentUser.role.slice(0,1)}</Avatar>
						<Box className='mt-3 mb-1 font-semibold text-lg font-sans'>{currentUser.username}</Box>
						<Box className='my-2 text-lg font-semibold font-sans'>{currentUser.email}</Box>
					</Box>
			</Box>
		)
	}

	const sidebarContent = ()=>{
		return(
			<Box role="presentation" className='w-full'>
				<Sidebar 
					  sidebarOptions={sidebarOptions} 
						handleClick={handleClick} 
						clearUser={clearUser} 
						toggleSidebarDrawer={toggleSidebarDrawer}
						toggleDrawer={toggleDrawer}
            currentUser={currentUser}
						open={open}
						handleOpen={handleOpen}
						responsiveBar={true}
					/>
       </Box>
		)
	}

	return (
		 <>
			 <Container className='bg-customBg h-20 navbarBg flex justify-between items-center sticky top-0 shadow-lg z-10'>
				 <Box className='text-2xl font-semibold font-serif'>
         {
					smallSizeScreen&& <Menu sx={{color:'#6495ED',fontSize:'32px'}} onClick={toggleSidebarDrawer(true)} className='mr-3'/>
				 }
				 Dashboard</Box>
					<Box>
						{
							icons.map((item)=>(
								<Tooltip title={item.message} key={item.count}>
								<IconButton size="large" color="primary" key={item.icon}>
									<Badge badgeContent={item.count} color="error">
									{item.icon}
									</Badge>
								</IconButton>
								</Tooltip>
							))
						}
					</Box>
			 </Container>
				<Container maxWidth='lg' className='bg-slate-50 text-white flex z-0'>
				  {
						!smallSizeScreen&& 
						<Sidebar 
					  sidebarOptions={sidebarOptions} 
						handleClick={handleClick} 
						clearUser={clearUser} 
						toggleDrawer={toggleDrawer}
            currentUser={currentUser}
						open={open}
						handleOpen={handleOpen}
						responsiveBar={false}
					/>
					}
					<Box className={`grow overViewBg p-2 ${smallSizeScreen?'overflow-x-scroll':''}`}>
						<Outlet/>
				 </Box>
				 {
					openModal&&
						<Modal 
							open={openModal}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
						>
							<Signup handleClose={handleClose} addModal={addModal}/>
						</Modal>
				 }
				 <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
					{DrawerList()}
				 </Drawer>
				  <Drawer open={sidebarDrawer}>
				    {sidebarContent()}
				 </Drawer>
			  </Container>
		 </>
		
	)
}

export default BarsLayout