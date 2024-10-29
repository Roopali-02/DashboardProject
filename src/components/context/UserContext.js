import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider =({children}) =>{
   const [users,setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response?.data?.users);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
   return(
     <UserContext.Provider value={{ users, setUsers, getAllUsers }}>
       {children}
     </UserContext.Provider>
   )
}