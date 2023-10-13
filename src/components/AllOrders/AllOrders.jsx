import axios from 'axios';
import { data } from 'jquery';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

export default function AllOrders() {

    const [userOrders, setUserOrders] = useState(null)

    async function getUserOrders(id){
        
        try {
            
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            setUserOrders(data)
            
        } 
        catch (error) {
            console.log("Error AllOrders :" ,error);
        }
    }

    useEffect( ()=>{ 
        const res = jwtDecode(localStorage.getItem("token")) 
        // setUserId()
        getUserOrders(res.id)
        
    })
    if (userOrders === null) {
        return <>
        <div className='v-100 mt-5 d-flex justify-content-center align-items-center'>
        <HashLoader  size={50} color="#36d7b7" />
        </div>
          </>
    }
  return <>
  <div className="container mt-5 mb-5" style={ {height : "100vh"} }>
    <div className="row gy-3">
        
        {userOrders.map(function(order,idx ){
         return <>
         
         <div className="col-md-6">
          <div className="order p-3 rounded-1">
            <h2 className='text-center prd-color'>Order Details</h2>
            <div className="container">
                <div className="row gy-2">
                    {order.cartItems.map(function(item , i){
                    return <div className="col-sm-4">
                     
                    <div className=' main-bg-color rounded-2 p-2'>
                    <img src={item.product.imageCover} className='w-100' alt="" />  
                    <h6>product title : {item.product.title.split(' ').slice(0,2).join(" ")}</h6>        
                    <h6>count : {item.count}</h6>        
                    <h6>Price : {item.price}</h6>        
            
                    </div>
                    </div>

                    })}
                </div>
            </div>
          
                <h5>Order sent to user with phone : {order.shippingAddress.phone} </h5>
                <h5>at : {order.shippingAddress.details}</h5>
                <h5>Total Order Price : {order.totalOrderPrice} EGP</h5>
                <h5>Payment Method : {order.paymentMethodType}</h5>
                
            
        </div> 
        </div>
        </>
        })}

    </div>
  </div>
  </>
}
