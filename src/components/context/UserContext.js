import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider =({children}) =>{
   const [users,setUsers] = useState([]);
   const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('token');
  };
  const getAllUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response?.data?.users);
    } catch (err) {
      setUsers([]);
    }
  }
   return(
     <UserContext.Provider value={{ users, setUsers, getAllUsers, currentUser, setCurrentUser, login, logout }}>
       {children}
     </UserContext.Provider>
   )
}