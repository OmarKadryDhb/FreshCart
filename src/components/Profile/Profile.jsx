import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

export default function Profile() {
  
    const [name, setName] = useState(null)
    const [role, setRole] = useState(null)

    useEffect(()=> {
    
        const res =  jwtDecode(localStorage.getItem("token"))

        setName(res.name)
        setRole(res.role)
       },[])

    if (name === null) {
        return <>
    <div className='v-100 mt-5 d-flex justify-content-center align-items-center'>
    <HashLoader  size={50} color="#36d7b7" />
    </div>
      </>
    }
   

  return <>
  <div style={{height : "80vh"}}> 
  <h1>{name}</h1>
  <h3>role : {role}</h3>
  <Link to='/allorders'>My Orders</Link>
  </div>
  </>
}
