import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';


export default function RecentProducts() {
  


  let { AddProductToCart,IsLoading } = useContext(cartContext);

  async function Add(productId) {
    let response = await AddProductToCart(productId)
   
   
    
    if (response?.data.status=="success") {
      toast.success(response?.data.message)
    }else
    {
      toast.error(response?.data.message)
    }
  }



  let { data, isError, isFetching, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className='w-full h-full flex items-center justify-center '><ClimbingBoxLoader color="green" /></div>;
  }

  if (isError) {
    return <div className='w-full h-full flex items-center justify-center '><h1>{error}</h1></div>;
  }


  return <>

    <div className=' row'>
      {data.data.data?.map((product) => <div key={product.id} className='p-4 w-[50%] md:w-1/3 lg:w-1/4  '>

        <div className='product bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border-0 rounded-3xl'>
          <Link to={`/productDetails/${product.id}/${product.category.name}`}>
            <img className='w-full' src={product.imageCover} alt={product.title} />
            <span className='text-green-600 block font-light'>{product.category.name}</span>
            <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
            <div className='flex justify-between items-center'>
              <span>{product.price}EGP</span>
              <span>{product.ratingsQuantity}<i className='fas fa-star text-yellow-400'></i></span>
            </div>
          </Link>
          <button onClick={() => Add(product.id)} className='btn  hover:bg-green-400 w-full'>{IsLoading?<i className='fas fa-spinner fa-spin'></i>:'Add To Cart'}</button>
        </div>

      </div>
      )}
    </div >

  </>
}
