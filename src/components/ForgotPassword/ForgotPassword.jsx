import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

export default function ForgotPassword() {
    const navigate =useNavigate();
    
    const [errMsg, setErrMsg] = useState(null);
    const [success, setSuccess] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    let initial={
        email:""
      };
    
    async function forgotPass(values){
        setIsLoading(true)
      try{
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
        console.log(data);
        if (data.statusMsg === "success") {
      
            setSuccess(data.message);
      
            setTimeout(function(){
              navigate('/resetcode');
            },1000);
          }  
    }  
      catch(e){
        setErrMsg(e.response.data.message);
     }
     setIsLoading(false);  
       
    }

    const formikobj=useFormik({
        initialValues:initial,
      
        onSubmit:forgotPass,
      
        validate:function (values) {
          setErrMsg(null);
          const errors={}
          if (!values.email.includes("@") || !values.email.includes(".")) {
            errors.email = "Envalid Email !"
          }
          return errors;
       }
      })
return <>
  <div className="data-form m-auto py-5" style={{ height : "70vh"}}>
      {errMsg ? <div className='alert alert-danger'>{errMsg}</div>:""}
      {success ? <div className='alert alert-success'>{success}</div>:""}
      
      <form onSubmit={formikobj.handleSubmit}>
        <label htmlFor="email">email :</label>
        <input onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="email" className='form-control mb-2'/>
        {formikobj.errors.email && formikobj.touched.email ? <div className='alert alert-danger'>{formikobj.errors.email}</div> : "" }

       
       
        <button type='submit' disabled={formikobj.isValid === false || formikobj.dirty===false} className='btn btn-success d-flex mb-2'>
          {isLoading ?<HashLoader  size={30} color="#36d7b7" /> :"send"}
        </button>
      </form>
      </div>
  
  </>
}
