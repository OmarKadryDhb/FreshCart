import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

export default function Register() {
  let initial={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  };

  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate =useNavigate();

  async function registerNewUser(values){
  setIsLoading(true);  
  try{
    const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)

    if (data.message === "success") {
      setSuccess("Account has alredy Created");
      setTimeout(function(){
        navigate('/login');
      },1000);
    }
  }
  catch (error){
    console.log("error",error.response.data.message);
    setErrMsg(error.response.data.message);
  }
  setIsLoading(false);  
  }

  const formikobj=useFormik({
    
  initialValues:initial,

  onSubmit:registerNewUser,

  validate:function (values) {
    setErrMsg(null);
    const errors={}
    if (values.name.length < 4 || values.name.length > 25) {
    errors.name = "Name must be from 4 to 15 charachters."
    }
    if (!values.email.includes("@") || !values.email.includes(".")) {
      errors.email = "Envalid Email !"
    }
    if (values.password.length < 4 || values.password.length > 10 ) {
      errors.password = "password must be from 4 to 10 charachters."
    }
    if (values.rePassword !== values.password ) {
      errors.rePassword = "Repassword Error !"
    }
    // phone validate 
    //  s1
    // if (values.phone.length !=11) {
    //   errors.phone = "phone Error !"
    // }
    //   s2 --> match
    if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
      errors.phone = "phone Error !"
    }
   
    // console.log(errors);
   
    return errors;

    


  }
})

  return <>
 <div className="data-form m-auto py-5">
      {errMsg ? <div className='alert alert-danger'>{errMsg}</div>:""}
      {success ? <div className='alert alert-success'>{success}</div>:""}
      
      <h2>Register now:</h2>
      <form onSubmit={formikobj.handleSubmit}>
        <label htmlFor="name">name :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.name} id='name'  type="text" className='form-control mb-2'/>
        {formikobj.errors.name && formikobj.touched.name ? <div className='alert alert-danger'>{formikobj.errors.name}</div> : "" }
        
        <label htmlFor="email">email :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="email" className='form-control mb-2'/>
        {formikobj.errors.email && formikobj.touched.email ? <div className='alert alert-danger'>{formikobj.errors.email}</div> : "" }
        
        <label htmlFor="phone">phone :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.phone} id='phone' type="tel" className='form-control mb-2'/>
        {formikobj.errors.phone && formikobj.touched.phone ? <div className='alert alert-danger'>{formikobj.errors.phone}</div> : "" }
        
        <label htmlFor="password">password :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="password" className='form-control mb-2'/>
        {formikobj.errors.password && formikobj.touched.password ? <div className='alert alert-danger'>{formikobj.errors.password}</div> : "" }
        
        <label htmlFor="rePassword">repassword :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.rePassword} id='rePassword' type="password" className='form-control mb-2'/>
        {formikobj.errors.rePassword && formikobj.touched.rePassword ? <div className='alert alert-danger'>{formikobj.errors.rePassword}</div> : "" }
        
        <button type='submit' disabled={formikobj.isValid === false || formikobj.dirty===false} className='btn btn-success d-flex'>
          {isLoading ?<HashLoader  size={30} color="#36d7b7" /> :"Register"}
        </button>
      
      </form>
      </div>
        </>
  
}
