import React,{useContext,useState,useEffect} from 'react';
import { Card, Box, Container, Paper } from '@mui/material';
import {UserContext} from '../context/UserContext';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { Line, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale, // Register the "category" scale
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

const AdminOverview = () => {
	const {users,getAllUsers} = useContext(UserContext);
	const [usersStats,setUsersStats] = useState({total:0,adminCount:0,othersCount:0,usersThisMonth:0})

	useEffect(()=>{
		const fetchUsers = async () => {
			await getAllUsers();
		};
		fetchUsers();
	},[])

	useEffect(()=>{
		if(users){
			const totalUsers=users.length;
			const totalAdmins=users.filter((user)=>user.role==='Admin').length;
			const totalOthers=totalUsers-totalAdmins;
			const currentMonth = dayjs().month();
			const currentYear = dayjs().year();
			const usersThisMonth = users.filter((user)=>{
				const userSignupDate = dayjs(user.createdAt);
				return userSignupDate.month() === currentMonth && userSignupDate.year() === currentYear;
			}).length;
			 setUsersStats({total:totalUsers,
				adminCount:totalAdmins,
				othersCount:totalOthers,
				usersThisMonth:usersThisMonth
			})
		}
	
	},[users])

	const cardData = [
		{
			title:'Total Users',
			count:usersStats?.total || 0
		},
		 {
			title:'New Sign-Ups (This Month)',
			count:usersStats?.usersThisMonth || 0
		},
		 {
			title:'Admin Users',
			count:usersStats?.adminCount || 0
		},
		 {
			title:'Other Users',
			count:usersStats?.othersCount || 0
		}
	]

	const userGrowthData=()=>{
		if (!users || users.length === 0) {
			return {
				labels: [],
				datasets: []
			};
		}
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
		];
		const currentYear = dayjs().year();
		const usersPerMonth = new Array(12).fill(0);
		users.forEach((user) => {
			const signupDate = dayjs(user.createdAt);
			if (signupDate.year() === currentYear) {
				const monthIndex = signupDate.month(); 
				usersPerMonth[monthIndex]++;
			}
		});
		return {
			labels: months,
			datasets: [
				{
					label: 'New Users',
					data: usersPerMonth,
					fill: false,
					borderColor: 'rgba(75, 192, 192, 1)',
					tension: 0.1,
				}
			]
		};
	}

	const userRoleData = () => {
		if (!users || users.length === 0) {
			return {
				labels: [],
				datasets: []
			};
		}

		const data = {
			labels: ['Admin Users', 'Other Users'],
			datasets: [
				{
					label: 'User Role Distribution',
					data: [usersStats.adminCount, usersStats.othersCount], 
					backgroundColor: ['#DE3163', '#36A2EB'], 
					hoverBackgroundColor: ['#FF6384', '#36A2EB']
				}
			]
		};

		return data;
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
		},
	}

	const chartData=[
		{
			title:'New User Growth Over Time',
			type: <Line data={userGrowthData()} options={chartOptions} />
		},
		{
			title: 'User Role Distribution',
			type: <Pie data={userRoleData()} options={chartOptions} />
		},
	]
 
	return (
		<Container>
			 <Box className='font-semibold text-3xl text-black my-5'>User Overview</Box>
			 <Grid container spacing={2} className=''>
			 {
				cardData.map((data,index)=>(
					<Grid size={{xs:12,sm:6,md:6}} key={index}>
						<Card className='flex shadow-sm'>
							<Box className='w-3/4 flex flex-col justify-center items-center p-4'>
								<Box className='text-xl font-semibold mb-2 text-neutral-500 font-sans'>{data.title}</Box>
								<Box className='text-3xl font-bold'>{data.count}</Box>
							</Box>
							<Box className='grow cardBg'></Box>
					 </Card>
					</Grid>
				))
			 }
			 </Grid>
			 
			<Box className='font-semibold text-3xl text-black my-5'>User Statistics Overview</Box>
			<Paper elevation={2} className='p-3'>
			  <Grid container spacing={2}>
				{
						chartData.map((chart,index)=>(
							<Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
								<Box>
									<span sx={{ fontSize: '13px' }} className='font-medium mb-2'>{chart.title}</span>
								</Box>
								<Box className={`${index === 1?'h-[260px]':null} w-full flex justify-center items-center`}>
								 {chart.type}
								</Box>
							</Grid>
						))
				}
				</Grid>
			</Paper>
		</Container>
	)
}

export default AdminOverview