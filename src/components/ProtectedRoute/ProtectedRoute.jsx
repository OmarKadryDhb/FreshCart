import React, {  useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from './../Context/AuthProvider';



export default function ProtectedRoute({children}) {
 
 const {token} = useContext(authContext);
 
 if (token === null ) {
  
   return <>
    <Navigate to ='/login'/>;
    
    </>   
 }
 
 return  <>
  
  {children}

  </>
}
