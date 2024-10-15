import axios from 'axios';
import React, { createContext, useState } from 'react'


export let cartContext = createContext(0);

export default function CartContextProvider(props) {


    const [IsLoading, setisLoading] = useState(false);
    const [cartDetails, setCartDetails] = useState(null);


    let headers = {
        token: localStorage.getItem('userToken')
    }

    function AddProductToCart(productId) {
        setisLoading(true)
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId
        }, {
            headers
        })
            .then((response) => {
                setisLoading(false)
                setCartDetails(response?.data);
                return response
            }).catch((error) => error)

    }
    function GetLoggedusercart() {
        setisLoading(true)

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => {
                setCartDetails(response?.data);
                setisLoading(false)
                return response
            })
            .catch((error) => error)
    }




    function Updatecartproduct(productId, count) {
        setisLoading(true)
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        }, {
            headers
        })
            .then((response) => {
                setCartDetails(response?.data);
                setisLoading(false)
                return response
            })
            .catch((error) => error)
    }
    function RemovespecificCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
            .then((response) =>  {
                
                setCartDetails(response?.data);
                return response})
            .catch((error) => error)
    }
    function ClearUserCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => {
                
                setCartDetails(null);
                return response})
            .catch((error) => error)
    }


    return <cartContext.Provider value={{
        AddProductToCart, GetLoggedusercart, Updatecartproduct, RemovespecificCartItem, IsLoading, ClearUserCart,cartDetails

    }}>
        {props.children}
    </cartContext.Provider>
}
