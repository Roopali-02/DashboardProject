import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ArrowDropUp, ArrowDropDown,Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOptions, handleClick, clearUser, toggleDrawer, currentUser,open, handleOpen,responsiveBar,toggleSidebarDrawer }) => {
	return (
		<Box className='sidebarBg w-[260px] p-2' sx={{ minHeight: responsiveBar?'100vh':'calc(100vh - 80px)'}}>
		  {
				responsiveBar&&<Close sx={{color:'#fff',fontSize:'25px'}} className='ml-3' onClick={toggleSidebarDrawer(false)}/>
			 }
				<List component="nav" className='pt-12'>
					{
						sidebarOptions.map((option, index) => (
							<Box key={option.title}>
								<ListItemButton
									onClick={index === 1 ? handleClick : option.title === 'LogOut' ? clearUser : option.title === 'My Profile' ? toggleDrawer(true) : null}
									component={Link}
									to={option.url}
									style={{color:'#fff', display: option.toShow === 'both' ? '' : (option.toShow === 'admin' && currentUser?.role === 'User') || (option.toShow === 'user' && currentUser?.role === 'Admin') ? 'none' : '' }}
								>
									<ListItemIcon sx={{ color: '#fff', minWidth: '40px !important' }}>{option.icon}</ListItemIcon>
									<ListItemText primary={option.title} className='sidebarTitle text-white' />
									{
										open && index === 1 ? <ArrowDropUp /> : null
									}
									{
										!open && index === 1 ? <ArrowDropDown /> : null
									}
								</ListItemButton>
								{
									index === 1 &&
									<Collapse in={open} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{
												option.children.map((nestedOp, nestedIndex) => (
													<ListItemButton
														key={nestedOp.icon}
														sx={{
															pl: 4,
															display: option.toShow === 'both' ? '' : (option.toShow === 'admin' && currentUser?.role === 'User') || (option.toShow === 'user' && currentUser?.role === 'Admin') ? 'none' : ''
														}}
														component={Link}
														to={nestedOp.url}
														onClick={nestedIndex === 1 ? handleOpen : null}
													>
														<ListItemIcon sx={{ color: '#fff', minWidth: '40px !important' }}>{nestedOp.icon}</ListItemIcon>
														<ListItemText primary={nestedOp.title} className='sidebarTitle text-white' />
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
		
	)
}

export default Sidebar