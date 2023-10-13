import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { authContext } from '../Context/AuthProvider';

export default function Login() {
  const {setToken} = useContext(authContext);
 
  let initial={
    email:"",
    password:"",
  };

  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(null);


  const [isLoading, setIsLoading] = useState(false);

  const navigate =useNavigate();

  async function loginToAccount(values){
  setIsLoading(true);  
  try{
    const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)

    if (data.message === "success") {
      localStorage.setItem('token',data.token);
      setToken(data.token);

      setSuccess("Welcome");

      setTimeout(function(){
        navigate('/products');
      },1000);
    }
  }
  catch (error){
    setErrMsg(error.response.data.message);
  }
  setIsLoading(false);  
  }


  const formikobj=useFormik({
  initialValues:initial,

  onSubmit:loginToAccount,

  validate:function (values) {
    setErrMsg(null);
    const errors={}
    if (!values.email.includes("@") || !values.email.includes(".")) {
      errors.email = "Envalid Email !"
    }
    if (values.password.length < 4 || values.password.length > 10 ) {
      errors.password = "password must be from 4 to 10 charachters."
    }
    return errors;
 }
})

  return <>
 <div className="data-form m-auto py-5" style={{ height : "70vh"}}>
      {errMsg ? <div className='alert alert-danger'>{errMsg}</div>:""}
      {success ? <div className='alert alert-success'>{success}</div>:""}
      
      <h2>login now :</h2>
      <form onSubmit={formikobj.handleSubmit}>
        <label htmlFor="email">email :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="email" className='form-control mb-2'/>
        {formikobj.errors.email && formikobj.touched.email ? <div className='alert alert-danger'>{formikobj.errors.email}</div> : "" }
        
        <label htmlFor="password">password :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="password" className='form-control mb-2'/>
        {formikobj.errors.password && formikobj.touched.password ? <div className='alert alert-danger'>{formikobj.errors.password}</div> : "" }
        
       
        <button type='submit' disabled={formikobj.isValid === false || formikobj.dirty===false} className='btn btn-success d-flex mb-2'>
          {isLoading ?<HashLoader  size={30} color="#36d7b7" /> :"Login"}
        </button>
        <Link to='/forgetpassword' className='prd-color'>Forget Password</Link>
      </form>
      </div>
        </>
  
}
