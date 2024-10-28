import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Signup from '../components/views/Signup';
import Login from '../components/views/Login';
import PageNotFound from '../components/common/PageNotFound';


const AppRoutes = () => {
  return (
    <div>
      <Routes>
       <Route path='/' element={<Signup/>}/>
       <Route path='/login' element={<Login />} />
       <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes