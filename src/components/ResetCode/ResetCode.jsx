import axios from 'axios'
import {  useFormik } from 'formik';
import React, { useState } from 'react'
import { HashLoader } from 'react-spinners';

export default function ResetCode() {
  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
       let initial={
        resetCode:""
      };
    async function VerifyResetCode(values){
       setIsLoading(true)
      try{
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
        console.log(data);
        if (data.statusMsg === "success") {
          setSuccess(data.message);
        }  
      }
       catch(e){
        setErrMsg(e.response.data.message);
       } 
       setIsLoading(false)
      }
  
    const formikobj=useFormik({
        initialValues:initial,
        onSubmit:VerifyResetCode,
        validate:function (values) {
          setErrMsg(null);
          const errors={}
          if (!values.resetCode.length > 6) {
            errors.resetCode = "Invalid code !"
          }
          return errors;
       }
      })

  return <>
  
  <div className="data-form m-auto py-5" style={{ height : "70vh" , width : "40%"}}>
      {errMsg ? <div className='alert alert-danger'>{errMsg}</div>:""}
      {success ? <div className='alert alert-success'>{success}</div>:""}
      <form onSubmit={formikobj.handleSubmit}>
        <label htmlFor= "reset">Code :</label>
        <input id="reset" name="reset" type="text" placeholder="Reset Code" onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.resetCode} className='form-control mb-2'/>
        {formikobj.errors.resetCode && formikobj.touched.resetCode ? <div className='alert alert-danger'>{formikobj.errors.resetCode}</div> : "" }
        <button type='submit' disabled={formikobj.isValid === false || formikobj.dirty===false} className='btn btn-success d-flex mb-2'>
          {isLoading ?<HashLoader  size={30} color="#36d7b7" /> :"send"}
        </button>
      </form>
  </div>

  </>
  
}
