import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom";
import freshcart from '../../images/freshcart-logo.svg';
import { authContext } from './../Context/AuthProvider';
import { cartContext } from './../Context/CartContext';
import { wishListContext } from '../Context/WishlistContext';

export default function Navbar () {
  const { token , setToken } = useContext(authContext);
  const { numOfCartItems  } = useContext(cartContext);
  const { numOfWishlistItems  } = useContext(wishListContext);

  const navigate =useNavigate();

  function logout() {
    console.log("Outtttttttt");
    localStorage.removeItem('token');
    setToken(null);

    navigate('/login')
  }

    return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
  <div className="container">
    <Link className="navbar-brand" to="/products"><img src={freshcart} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      {token? <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to="/cart">
          <i class="fa-solid fa-cart-shopping fs-4"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {numOfCartItems}
          <span className="visually-hidden">unread messages</span>
          </span>
            </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to="/wishlist">
          <i class="fa-regular fa-heart fs-3 prd-color ms-2"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {numOfWishlistItems} 
          <span className="visually-hidden">unread messages</span>
          </span>
          </Link>
        </li>
        
      </ul>
      </> :""}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
        <li className="nav-item me-3">
        <i className='fa-brands fa-facebook-f me-1'></i>
        <i className='fa-brands fa-instagram me-1'></i>
        <i className='fa-brands fa-twitter me-1'></i>
        <i className='fa-brands fa-tiktok me-1'></i>
        
        </li>

      {!token ? <><li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>:""}

      {token? <>
        
        <li className="nav-item">
          <span onClick={logout} style={{cursor:"pointer"}} className="nav-link" to="/about">SignOut</span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile"><i class="fa-solid fa-circle-user fs-3"></i></Link>
        </li>
        </>:""}
        
         
             </ul>
      
    </div>
  </div>
</nav>
    </>
  
}
