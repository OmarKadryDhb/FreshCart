import React  from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider () {
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows : false
    };
    return <>

      
        <Slider {...settings}>
          <div>

            <img src={ require("../../images/slider-image-1.jpeg") } style={{width :"100%" , height : "450px"}} alt="slider" />

          </div>
          
          <div>
 
          <img src={ require("../../images/slider-2.jpeg") } style={{width :"100%" , height : "450px"}} alt="slider" />

          </div>
          
          <div>

          <img src={ require("../../images/slider-image-3.jpeg") } style={{width :"100%" , height : "450px"}} alt="slider" />

          </div>
          
          <div>

          <img src={ require("../../images/slider-image-2.jpeg") } style={{width :"100%" , height : "450px"}} alt="slider" />

          </div>
          
        </Slider>
      

      </>
    }