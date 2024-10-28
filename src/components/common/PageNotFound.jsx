import React from 'react';
import {Container ,Box,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth='md' className='min-h-screen flex flex-col justify-center items-center'>
      <Box className='w-full h-[320px] text-white rounded-lg pageNotFoundBg font-serif flex items-center justify-center text-4xl font-semibold'>Page Not Found!</Box>
       <Box className='mt-4'>
        <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
      </Box>
    </Container>
  )
}

export default PageNotFound