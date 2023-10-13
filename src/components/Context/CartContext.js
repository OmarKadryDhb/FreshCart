import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const cartContext = createContext();



export default function CartContextProvider({children}) {

    const [cartProducts, setCartProducts] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [numOfCartItems, setNumOfCartItems] = useState(null)

    const [cartId, setCartId] = useState(null)

    async function addToCart(productId){
    try{
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            "productId" : productId
        },
        {
          headers : { token : localStorage.getItem("token") }
        });

        getUserCart();

        return data;
      }
      catch (e){
        console.log("Error! Add :",e);
      }  
    
    }
    
    async function getUserCart(){
        try{

            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
            {
              headers : { token : localStorage.getItem( "token" ) }
            });
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products)
            setCartId(data.data._id);
            return data;
          }
          catch (e){
            console.log("Error Get! :",e);
          }
    }
    
    async function deleteProduct(productId){
        try{
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
              headers : { token : localStorage.getItem( "token" ) }
            });
    
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products)
    
            return data;
          }
          catch (e){
            console.log("Error delete! :",e);
          }
    }

    async function updateCount(productId , count){
      try{
          const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{

            "count" : count
          }
          ,
          {
            headers : { token : localStorage.getItem( "token" ) }
          });
  
          setNumOfCartItems(data.numOfCartItems);
          setTotalPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products)
  
          return data;
        }
        catch (e){
          console.log("Error count! :",e);
        }
    }

    async function clearCartData(){
      try{
          const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
          {
            headers : { token : localStorage.getItem( "token" ) }
          });
  
          setNumOfCartItems(0);
          setTotalPrice(0);
          setCartProducts([]);
  
          return data;
        }
        catch (e){
          console.log("Error count! :",e);
        }

    }
    useEffect(function(){
        getUserCart();
    },[])

  return <cartContext.Provider value={ {addToCart 
  , getUserCart
  , cartProducts
  , totalPrice
  , numOfCartItems
  , deleteProduct
  , updateCount
  , clearCartData
  , cartId
  , setCartProducts
  , setTotalPrice 
  , setNumOfCartItems
    } }>
  
  {children}
  
  </cartContext.Provider>
}
