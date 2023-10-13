import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';

export default function Brands() {
  
  async function allBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  async function getBrandItems(){
    
  }

  const { data , isFetching , isLoading , isError , refetch } = useQuery("allBrands",allBrands )

  if (isLoading) {
    return <>
    <div className='vh-75 mt-5 d-flex justify-content-center align-items-center'>
    <HashLoader  size={50} color="#36d7b7" />
    </div>
      </>
  }
  
  return<>
  <div className="container order rounded-3 mt-5 mb-5">
    <div className="row gy-3">
      {data?.data.data.map(function(brand , idx){
          return <>
            <div className="col-lg-3 col-md-4 p-2 rounded-2" key={idx}>
            <div className="brand-card" style={{cursor:"pointer"}}>
            <div className="brand-img text-center">
              <img src={brand.image} className='w-75' alt="" />
            </div>
            <div className="brand-desc text-center prd-color">
              <h4>{brand.name}</h4>
            </div>

              </div>
              </div> 
              </>
      })}

    </div>
  </div>
  
  </>
}
