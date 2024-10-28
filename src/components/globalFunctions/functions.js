import { Box } from '@mui/material';


export const clearNotification = (error,setError)=>{
  let timer;
  if (error.show) {
    timer = setTimeout(() => {
      setError((prev) => ({ ...prev, show: false }));
    }, 3000)
  }
  return () => {
    clearTimeout(timer);
  };
}


export const commonContainer = (page) => {
  const isLogin = page === 'login';
  return <Box className={`font-semibold text-4xl flex justify-center items-center ${isLogin ? 'h-60' : 'h-48'} text-white py-2 mb-3 mt-2`}
    sx={
      {
        background: 'linear-gradient(56deg, rgba(254, 254, 254, 0.05) 0%,rgba(254, 254, 254, 0.05) 69%, rgba(160, 160, 160, 0.05) 69%, rgba(160, 160, 160, 0.05) 100%), linear-gradient(194deg, rgba(102, 102, 102, 0.02) 0%, rgba(102, 102, 102, 0.02) 60%, rgba(67, 67, 67, 0.02) 60%, rgba(67, 67, 67, 0.02) 100%), linear-gradient(76deg, rgba(169, 169, 169, 0.06) 0%,rgba(169, 169, 169, 0.06) 89%,rgba(189, 189, 189, 0.06) 89%, rgba(189, 189, 189, 0.06) 100%), linear-gradient(326deg, rgba(213, 213, 213, 0.04) 0%, rgba(213, 213, 213, 0.04) 45%, rgba(66, 66, 66, 0.04) 45%,rgba(66, 66, 66, 0.04) 100%), linear-gradient(183deg, rgba(223, 223, 223, 0.01) 0%, rgba(223, 223, 223, 0.01) 82%, rgba(28, 28, 28, 0.01) 82%, rgba(28, 28, 28, 0.01) 100%), linear-gradient(3deg, rgba(20, 20, 20, 0.06) 0%, rgba(20, 20, 20, 0.06) 62%, rgba(136, 136, 136, 0.06) 62%, rgba(136, 136, 136, 0.06) 100%), linear-gradient(200deg, rgba(206, 206, 206, 0.09) 0%,rgba(206, 206, 206, 0.09) 58%, rgba(6, 6, 6, 0.09) 58%,rgba(6, 6, 6, 0.09) 100%), linear-gradient(304deg, rgba(162, 162, 162, 0.07) 0%, rgba(162, 162, 162, 0.07) 27%, rgba(24, 24, 24, 0.07) 27%, rgba(24, 24, 24, 0.07) 100%), linear-gradient(186deg, rgba(166, 166, 166, 0.04) 0%, rgba(166, 166, 166, 0.04) 5%,rgba(210, 210, 210, 0.04) 5%, rgba(210, 210, 210, 0.04) 100%), linear-gradient(90deg, rgb(26, 60, 118), rgb(32, 129, 207), rgb(7, 128, 191))'
      }
    }
  >
    {page === 'login' ? 'Login' : 'Signup'}
  </Box>
}

