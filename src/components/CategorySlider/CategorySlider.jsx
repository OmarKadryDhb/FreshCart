import React  from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { HashLoader } from 'react-spinners';

export default function CategorySlider () {
  
    function getCategories(){
        return  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const { isLoading , data }=useQuery("categoryProducts" ,getCategories,{
        refetchOnMount : false
    }
    );

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
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

        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                <Slider {...settings}>
                {data?.data.data.map(function (category , idx) {
                return <div key={idx}>

                <img src={ category.image } style={{width :"100%" , height : "200px"}} alt="slider" />
                <h6 className="text-center">{category.name}</h6>    
              </div>
             
            })}
          
        </Slider>
                  
                </div>
            </div>
        </div>
        

      </>
    }