import React from 'react';
import {UserProvider} from '../components/context/UserContext';
import {Routes,Route} from 'react-router-dom';
import Signup from '../components/views/Signup';
import Login from '../components/views/Login';
import PageNotFound from '../components/common/PageNotFound';
import BarsLayout from '../components/common/BarsLayout'; 
import Dashboard from '../components/views/Dashboard';
import Users from '../components/views/Users';
import AdminOverview from '../components/views/AdminOverview';

const AppRoutes = () => {
  return (
    <UserProvider>
      <div>
        <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
          {/* <Route path='/layout' element={<BarsLayout />} /> */}
          <Route element={<BarsLayout />}>
            <Route path='/dashboard' element={<AdminOverview />} />
            <Route path='/users' element={<Users />} />
            {/* <Route path='/admin-overview' element={<AdminOverview />} /> */}
          </Route>
        </Routes>
      </div>
    </UserProvider>
  )
}

export default AppRoutes