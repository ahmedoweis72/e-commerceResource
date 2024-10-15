import React, { useContext, useEffect, useState } from 'react'
import styles from './CheckOut.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContextProvider';

export default function CheckOut() {


  let { cartDetails } = useContext(cartContext);



  let headers = {
    token: localStorage.getItem('userToken')
  }

  
  

   function checkOut(shippingAddress) {

    
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartDetails.cartId}?url=https://e-commerce-r-eact.vercel.app/`, {shippingAddress}, {
      headers:headers
    }).then((response)=>window.location.href=response.data.session.url
    )
    .catch((err)=>console.log(err))
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: checkOut,
  })
 
  

  return <>

    <div className='md:max-w-lg mx-auto p-10 md:p-0'>
      <form onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl text-center md:text-left font-bold mb-6 text-emerald-500'>shipping Address</h2>


        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter details</label>
        </div>





        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter phone</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="tel" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter city</label>
        </div>

        <div className='md:flex items-center '>
          <button type="submit" className="my-3 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700">
            Checkout $
          </button>

        </div>


      </form>
    </div>

  </>
}
