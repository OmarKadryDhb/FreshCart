import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

export default function Payment() {
  
  const {cartId , setNumOfCartItems , setTotalPrice , setCartProducts } = useContext(cartContext);
  
  const [errMsg, setErrMsg] = useState(null);
  const [success, setSuccess] = useState(null);
 

  async function cashPayment (){
    const phoneVal = document.querySelector("#Phone").value 
    const cityVal = document.querySelector("#city").value 
    const detailsVal = document.querySelector("#details").value 
  
    const shippingAddress ={
         "shippingAddress":{
            "details":detailsVal,
            "phone":phoneVal,
            "city":cityVal,
        }
    }

    try {
        // orders
     const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress ,{
        headers : { token : localStorage.getItem( "token" ) }
    })  

    if (data.status === "success") {
      toast.success("Ordered Successfuly")
      setCartProducts([]);
      setTotalPrice(0)
      setNumOfCartItems(0)
    }
    else{
      toast.error("Something Went Wrong")
    }

    // console.log(data);
    return data;
    } 
    catch (error) {
        console.log("Error Payment" , error);

    }
  }
  
  async function onlinePayment(){
    
    const phoneVal = document.querySelector("#Phone").value 
    const cityVal = document.querySelector("#city").value 
    const detailsVal = document.querySelector("#details").value 
  
    const shippingAddress ={
         "shippingAddress":{
            "details":detailsVal,
            "phone":phoneVal,
            "city":cityVal,
        }
    }

    try{
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingAddress ,{

        headers : { token : localStorage.getItem( "token" ) },

        params : { url : "http://localhost:3000"}

      })

      window.open(data.session.url)    
}
    catch(e){
      console.log("Error inlinePayment",e);
    }
    
  }

  

  return <>
  <div className="container mt-5" style={{ height : "50vh"}}>
    <h2 className='text-center fw-bold prd-color'>Payment</h2>
    <form action="">

        <label htmlFor="">Phone :</label>
        <input id='Phone' type="tel" className='mb-3 form-control' />
        
        <label htmlFor="">City :</label>
        <input id='city' type="text" className='mb-3 form-control' />
        
        <label htmlFor="">Details :</label>
        <textarea id='details' type="text" className='mb-3 form-control' ></textarea>
        
    </form>
    <div className="payment-btns">
    <button onClick={cashPayment} className='btn btn-success'>Confirm Cash Payment</button>
    <button onClick={onlinePayment} className='ms-2 btn btn-success'>Confirm Online Payment</button>
    </div>
  </div>
  </>
}
