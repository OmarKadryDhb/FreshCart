import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { useQuery } from 'react-query';
import HomeSlider from './../HomeSlider/HomeSlider';
import CategorySlider from './../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from './../Context/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../Context/WishlistContext';


export default function Products() {

  const {addToCart} = useContext(cartContext);
  const {addToWishlist} = useContext(wishListContext);

  async function addProduct( id ){
      const response = await addToCart( id );

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
  }

  async function addItemToWishlist( id ){
    const response = await addToWishlist( id );

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
}

  
  async function allProducts(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data , isFetching , isLoading , isError , refetch } = useQuery("allProducts",allProducts )


  // const [allProducts, setAllProducts] = useState(null);

  // async function getProducts(values){
  
  //  try{  
  //   const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products",values)
  //   setAllProducts(data.data);

  //   console.log(data.data);
    
  //  }
  //  catch(e){
  //  console.log("error :",e.response.data.message); 
  //  }  

  // }

  // useEffect(function(){
  //   getProducts();
  //   },[])

  if (isLoading) {
    return <>
    <div className='vh-75 mt-5 d-flex justify-content-center align-items-center'>
    <HashLoader  size={50} color="#36d7b7" />
    </div>
      </>
  }

  return <>


    <div className="container mt-5 mb-5">

    <div className="row gx-0 mb-5">
      <div className="col-sm-9">
        <HomeSlider/>
      </div>
      <div className="col-sm-3">
        <img src={require("../../images/blog-img-1.jpeg")} style={{width :"100%" , height : "225px"}} alt="" />
        <img src={require("../../images/blog-img-2.jpeg")} style={{width :"100%" , height : "225px"}} alt="" />
      </div>
    </div>

    <CategorySlider/>

    <div className="row gy-4 mt-3">
    {data?.data.data.map(function(prd,idx){return <>
    <div className="col-lg-2 col-md-4" key={idx} style={{cursor:"pointer"}}>
    
    <div className="prd-card" >
    <Link className='prd-link' to={`/prddetails/${prd.id}`}>
      
      <img src={prd.imageCover} className='w-100' alt="" />
      <h6 className='prd-name prd-color'>{prd.category.name}</h6>
      <h6 className='prd-title'>{prd.title.split(' ').slice(0,2).join(" ")}</h6>
      <div className='d-flex justify-content-between align-items-center'>
      <h6 className='text-center'>{prd.price} EGP</h6>
      <span>{prd.ratingsAverage} <i className='fa-solid fa-star text-warning'></i></span>
      </div>
      </Link>
      <div className="btns d-flex justify-content-between align-items-center mt-3">
      <button onClick={()=> addProduct( prd.id )} className='main-bg-color p-2 border-0 text-white w-75 rounded-3 '>+ Add<i className="fa-solid fa-cart-shopping ms-2"></i></button>
      <button onClick={()=> addItemToWishlist(prd.id)} className='btn'>
      <i class="fa-regular fa-heart fs-3 prd-color ms-2"></i>
      </button>
     
      </div>
      
    </div>

    </div>
    </> 
    })}
  
    </div>
    </div>
    
    </>
  
}
