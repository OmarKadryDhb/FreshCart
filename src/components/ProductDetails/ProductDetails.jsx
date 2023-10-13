import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { cartContext } from './../Context/CartContext';
import { toast } from 'react-hot-toast';
import ProductSlider from '../ProductSlider/ProductSlider';

export default function ProductDetails() {
  
  const { addToCart} = useContext(cartContext);

  const {id}= useParams();  
  
  const [sendingLoader, setSendingLoader] = useState(false)

  async function addProducts(id){

    setSendingLoader(true);

    const response = await addToCart(id);
    
    if (response.status === "success") {
      toast.success(response.message, {
        className : "bg-success text-white",
      })
    }
    else {
      toast.error("Error", {
        className : "bg-danger text-white",
      })
    }
    setSendingLoader(false);

  }

  function getProductsDetails(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data , isLoading } =useQuery("productDetails" , getProductsDetails );
  

  if (isLoading) {
    return <>
    <div className='v-100 mt-5 d-flex justify-content-center align-items-center'>
    <HashLoader  size={50} color="#36d7b7" />
    </div>
      </>   
  }
  return <>
  
  <div className="container d-flex flex-column justify-content-center mb-5 mt-5" style={ { height : "80vh" }}>
    <div className="row">
        <div className="col-md-4 mb-4">
            <div className="prd-img">
                {/* <img src={data.data.data.imageCover} style={{width : "100%"}} alt={data.data.data.title} /> */}
                <ProductSlider/>

            </div>
        
        </div>

        <div className="col-md-8 d-flex flex-column  justify-content-center">
            <div className="prd-desc">
                <h2>{data.data.data.title.split(' ').slice(0,5).join(" ")}</h2>
                <h6 className='text-muted'>{data.data.data.description}</h6>
                <span className='fw-bold'>Price :  {data.data.data.price} EGP</span>
            </div>
            <button onClick={()=> addProducts(data.data.data.id)} className='main-bg-color p-2 border-0 text-white rounded-3 w-75 mt-3'> 
            {sendingLoader? 
            <HashLoader className='m-auto'  size={50} color="#36d7b7" /> :
            "+ Add to Cart"
            }
            </button>
        </div>
    </div>

  </div>
  
  </>
}
