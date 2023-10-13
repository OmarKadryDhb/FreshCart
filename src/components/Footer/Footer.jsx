import React from 'react'
import freshcart from '../../images/freshcart-logo.svg';
import amazonPay from '../../images/Partners/amazon.0987f3d2995b8311fa3a.png';
import visa from '../../images/Partners/download.png';
import mastercard from '../../images/Partners/masterCard.c1c3f1e9c8aad6e536df.png';
import paypal from '../../images/Partners/paypal.e5903e4ad1ac0f166577.png';
import playstore from '../../images/googlePlay.88c0cf672ae4dd873d7f.png';
import apple from '../../images/apple.ac8ebb531a4c6685aa8a.png';

export default function Footer() {
  return <>
  
  <footer className=''>
    
    <div className="div get pt-3">
    <div className='container pt-2'>
      <h3>Get The FreshCart app</h3>
      <p>We Will Send You a link, open it on your phone to download the app.</p>
      <div className="email-share d-flex">
        <input type="email" className='w-75 form-control me-5' placeholder='Email...'/>
        <button className='main-bg-color p-2 border-0 rounded-2 text-white h6' style={{ width : "300px"}}>Share App Link</button>
      </div>
      <div className="row mt-5 border-top border-1 pt-5 pb-5">
        <div className="col-md-6">
        <div className="payment-partners d-flex align-items-center">
        
        <span className='fw-bold'>Payment Parteners :</span>
        
        <div className="amazon-pay ms-3">
        <img src={amazonPay} style={ { width : "100%" , height : "70px"} } alt="amazonpay" />
        </div>
        
        <div className="visa ms-3">
        <img src={visa} style={ { width : "100%" , height : "90px"} } alt="visa" />
        </div>
        
        <div className="master-card ms-3">
        <img src={mastercard} style={ { width : "100%" , height : "50px"} } alt="mastercard" />
        </div>
        
        <div className="master-card ms-3">
        <img src={paypal} style={ { width : "100%" , height : "50px"} } alt="paypal" />
        </div>
        </div> 
        </div>

        <div className="col-md-6 ">
          <div className="Deliveries d-flex justify-content-around align-items-center">
        <div className="Deliveries-title">
          <span className='fw-bold'>Get Deliveries with FreshCart</span>
        </div>
        <div className="Deliveries-img d-flex align-items-center justify-content-center">
        <div className="playstore ms-3">
            <img src={playstore} style={ { width : "100%" , height : "105px"} } alt="googlePlay" />
          </div>

          <div className="apple ms-3">
            <img src={apple} style={ { width : "100%" , height : "50px"} } alt="apple" />
          </div>
        </div>
        </div>
        
        </div>
      </div>
      </div>
    </div>
   
    <div className=" main-bg-color footer-content d-flex flex-column justify-content-center align-items-center">
      <div className="footer-img">
      <img src={freshcart} style={{width : "100%" , height : "80px"}} className='bg-white rounded-3 p-3 mt-2' alt="" />
      </div>
      <h3 className='text-white mt-2'>Your Trusted Markert .</h3>
    </div>
  </footer> 
  </>
  
}
