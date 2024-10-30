import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOptions, handleClick, clearUser, toggleDrawer, currentUser,open, handleOpen,responsiveBar }) => {
	return (
		<Box className='sidebarBg w-[260px] p-2' sx={{ minHeight: responsiveBar?'100vh':'calc(100vh - 80px)'}}>
				<List component="nav">
					{
						sidebarOptions.map((option, index) => (
							<Box key={index}>
								<ListItemButton
									onClick={index === 1 ? handleClick : option.title === 'LogOut' ? clearUser : option.title === 'My Profile' ? toggleDrawer(true) : null}
									component={Link}
									to={option.url}
									style={{ display: option.toShow === 'both' ? '' : (option.toShow === 'admin' && currentUser?.role === 'User') || (option.toShow === 'user' && currentUser?.role === 'Admin') ? 'none' : '' }}
								>
									<ListItemIcon sx={{ color: '#fff', minWidth: '40px !important' }}>{option.icon}</ListItemIcon>
									<ListItemText primary={option.title} className='sidebarTitle' />
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
												option.children.map((nestedOp, index) => (
													<ListItemButton
														key={nestedOp.icon}
														sx={{
															pl: 4,
															display: option.toShow === 'both' ? '' : (option.toShow === 'admin' && currentUser?.role === 'User') || (option.toShow === 'user' && currentUser?.role === 'Admin') ? 'none' : ''
														}}
														component={Link}
														to={nestedOp.url}
														onClick={index === 1 ? handleOpen : null}
													>
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
		
	)
}

export default Sidebar