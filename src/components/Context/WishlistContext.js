import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const wishListContext = createContext();


export default function WishlistContextProvider({children}) {


    const [wishlistProduct, setWishlistProduct] = useState(null);
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(null)

    async function addToWishlist(productId){
        try{
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
                "productId" : productId
            },
            {
              headers : { token : localStorage.getItem("token") }
            });
            getUserWishlist();
    
            return data;
          }
          catch (e){
            console.log("Error! Add to WishList :",e);
          }  
        

        }

    async function getUserWishlist(){
        try{
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                  headers : { token : localStorage.getItem("token") }
                });
                setNumOfWishlistItems(data.count)
                setWishlistProduct(data.data)
                return data;
              }
              catch (e){
                console.log("Error! get WishList :",e);
              }  
        }
    
    async function deleteFromWishlist(productId){
        try{
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                headers : { token : localStorage.getItem("token") }
                });

                getUserWishlist()       
            return data;
        }
        catch (e){
            console.log("Error! delete from WishList :",e);
        }  
        }

   
            
    useEffect(function() {
        getUserWishlist();
    }, [])

    return <wishListContext.Provider value={{ 
         numOfWishlistItems
       , wishlistProduct
       , deleteFromWishlist
       , addToWishlist 
        }}> 
  
    {children}

  </wishListContext.Provider>
}
