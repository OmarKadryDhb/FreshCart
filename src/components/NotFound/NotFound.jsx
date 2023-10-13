import React from 'react'
import NotFoundImg from '../../images/error.svg';
export default function NotFound() {
  return <>
    
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <div className="not-found-img d-flex justify-content-center align-items-center">
            <img src={NotFoundImg} className='w-50' alt="" />
          </div>
        </div>
      </div>
    </div>

    </>
}
