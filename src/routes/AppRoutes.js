import React from 'react';
import {UserProvider} from '../components/context/UserContext';
import {Routes,Route} from 'react-router-dom';
import Signup from '../components/views/Signup';
import Login from '../components/views/Login';
import PageNotFound from '../components/common/PageNotFound';
import BarsLayout from '../components/common/BarsLayout'; 
import ProtectedRoute from '../components/ProtectedRoute';
import Users from '../components/views/Users';
import AdminOverview from '../components/views/AdminOverview';

const AppRoutes = () => {
  return (
    <UserProvider>
        <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
          <Route element={<BarsLayout />}>
          <Route path='/dashboard' element={<ProtectedRoute><AdminOverview /></ProtectedRoute>} />
          <Route path='/users' element={<Users />} />
          </Route>
        </Routes>
    </UserProvider>
  )
}

export default AppRoutes