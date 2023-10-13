
import React  from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { HashLoader } from 'react-spinners';
import { useParams } from "react-router-dom";


  
export default function ProductSlider () {

    const {id}= useParams();  

    function getProductsDetails(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      }
    
      const { data , isLoading } =useQuery("productDetails" , getProductsDetails );
      
      console.log("slider :" , data);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : false
    };

    if (isLoading) {
        return <>
        <div className='d-flex justify-content-center align-items-center'>
        <HashLoader  size={50} color="#36d7b7" />
        </div>
          </>
    }
    return <>

       <Slider {...settings}>

                {data?.data.data.images.map(function(img,idx){return <>
                    
                  <div className="">
                   <img src={data.data.data.images[idx]} style={{width :"100%" }} alt="slider" />
                  </div>
             
                  </>  
                    
                    })}    


        </Slider>
                  
     
      </>
    }