import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners'
import { wishListContext } from '../Context/WishlistContext'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'

export default function Wishlist() {
  
    const {addToCart} = useContext(cartContext);

    const { numOfWishlistItems 
        , wishlistProduct 
        , deleteFromWishlist 
         } = useContext(wishListContext)

  
  async function deleteItem( id ){

    const response = await deleteFromWishlist(id)
    if (response.status === "success") {
        toast.success("Successfully Deleted")
    }
    else{
        toast.error("Error")
    }

  }  
  
  async function addProduct( id ){

    const response = await addToCart(id)
    if (response.status === "success") {
        toast.success("Successfully Added")
    }
    else{
        toast.error("Error")
    }

  }  
  
    if (wishlistProduct === null) {
    return <>
       <div className='v-100 mt-5 d-flex justify-content-center align-items-center'>
       <HashLoader  size={50} color="#36d7b7" />
       </div>
     </> 
   }
   if (wishlistProduct.length === 0 ) {
    return <>
       <div className="container d-flex justify-content-center align-items-center" style={{ height : "60vh" }}>
        <div className="content">
          <h1 className='text-center'>No data in Your Wishlast</h1>
          <h2 className='text-center bg-success rounded-3'><Link to="/products" className='text-white'>Save some Products ! ...</Link></h2>
        </div>
       </div>
       </> 

   }
  return <>
  
  <div className="container py-4 mt-4 mb-5 rounded-3" style={{background : "#eee"}}>
        <div className="header">
            <h2>My Wishlist :</h2>
            <p className='prd-color'>Total Items : {numOfWishlistItems}</p>
        </div>
        {wishlistProduct.map(function(product , idx ){
            return <>
            <div key={idx} className="row gy-2 border-bottom d-flex justify-content-center align-items-center pb-2 my-1">
            
            <div className="col-sm-2">
                <div className="prd-img">
                <img src={product.imageCover} style={{width : "100%"}} alt="" />
            </div>
            </div>
            <div className="col-sm-8">
                <div className="info">
                <h5 className='fw-bold'>Title : {product.title}</h5>
                <h5 className='fw-bold'>Price : {product.price} EGP</h5>
                </div>  
            </div>
           <div className="col-sm-2">
            <div className="btns">
           <button onClick={()=> addProduct(product.id)} className='btn btn-success'> + Add to Cart</button>
            
           <button onClick={()=> deleteItem(product.id)} className='btn text-danger'><i class="fa-solid fa-trash-can"></i> Remove</button>
           </div>
           </div>
        </div>
        </> 
        })
        }
        
    </div>


  </>
}
