import React, { useContext } from 'react'
import { cartContext } from './../Context/CartContext';
import { useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

    const { cartProducts , totalPrice , numOfCartItems , deleteProduct , updateCount , clearCartData } = useContext(cartContext);

    async function deletePrd( id ){
      const response = await deleteProduct( id )
       
      if (response.status === "success") {
        toast.success("Product Removed")
      }
      else {
        toast.error("an ERROR")
      }
    }

    async function deleteCart( ){
       await clearCartData( )
    }
    

    async function updateEleCount( id , count){

      const response = await updateCount( id , count )
       
      if (response.status === "success") {
        
        toast.success("Product Updated")
      }
      else {
        toast.error("an ERROR")
      }
    
    }

    // console.log(cartProducts);
    if (cartProducts === null) {
     return <>
        <div className='v-100 mt-5 d-flex justify-content-center align-items-center'>
        <HashLoader  size={50} color="#36d7b7" />
        </div>
      </> 
    }
    
    if (cartProducts.length === 0 ) {
      return <>
         <div className="container d-flex justify-content-center align-items-center" style={{ height : "60vh" }}>
          <div className="content">
            <h1 className='text-center'>No data in Your Cart</h1>
            <h2 className='text-center bg-success rounded-3'><Link to="/products" className='text-white'>Get some Products ...</Link></h2>
          </div>
         </div>
         </> 

     }
     
  return <>
    
    <div className="container py-4 mt-4 mb-5 rounded-3" style={{background : "#eee"}}>
        <div className="header">
            <h2>Shop Cart :</h2>
            <p className='prd-color m-0'>Total Price : {totalPrice} EGP</p>
            <p className='prd-color'>Total Items : {numOfCartItems}</p>
            
            <div className="d-flex justify-content-between align-items-center">
            <button onClick={deleteCart} className='btn btn-danger p-2'>Clear Cart</button>
            <Link to="/payment"  className='btn btn-success p-2 text-white'>Confirm Purchase</Link>
            
            </div>
        </div>
        {cartProducts.map(function(product , idx ){
            return <>
            <div key={idx} className="row gy-2 border-bottom d-flex justify-content-center align-items-center pb-2 my-1">
            
            <div className="col-sm-1">
                <img src={product.product.imageCover} style={{width : "100%"}} alt="" />
            </div>
            <div className="col-sm-9">
                <h6>Title : {product.product.title}</h6>
                <h6>Price : {product.price}</h6>
                <button onClick={()=> deletePrd(product.product.id)} className='btn btn-danger'>Remove</button>
            </div>
            <div className="col-sm-2">
              {product.count==0?<><button onClick={()=> updateEleCount (product.product.id , product.count+1)} className='btn border-success me-2'>+</button>
                <small className='fw-bold'>{product.count}</small>
                <button onClick={()=> updateEleCount (product.product.id , product.count)} className='btn border-danger ms-2'>-</button>
                </>:
                <><button onClick={()=> updateEleCount (product.product.id , product.count+1)} className='btn border-success me-2'>+</button>
                <small className='fw-bold'>{product.count}</small>
                <button onClick={()=> updateEleCount (product.product.id , product.count-1)} className='btn border-danger ms-2'>-</button>
                </>}
                
            </div>
        </div>
        </> 
        })
        }
        
    </div>

</>
}
